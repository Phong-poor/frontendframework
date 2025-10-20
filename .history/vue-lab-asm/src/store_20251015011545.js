import { createStore } from 'vuex'
import axios from 'axios'

const API_URL = 'http://localhost:3000/cart'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const store = createStore({
  state() {
    return {
      carts: JSON.parse(localStorage.getItem('cart')) || [],
      loading: false,
      error: null
    }
  },

  getters: {
    cartItems: (state) => state.carts,
    cartTotal: (state) => state.carts.reduce((t, item) => t + item.price * item.quantity, 0)
  },

  mutations: {
    setCart(state, carts) {
      state.carts = carts
      localStorage.setItem('cart', JSON.stringify(carts))
    },

    add_cart(state, product) {
      const exist = state.carts.find(item => item.id === product.id)
      if (exist) {
        exist.quantity++
      } else {
        state.carts.push({ ...product, quantity: 1 })
      }
      localStorage.setItem('cart', JSON.stringify(state.carts))
    },

    remove_cart(state, id) {
      state.carts = state.carts.filter(item => item.id !== id)
      localStorage.setItem('cart', JSON.stringify(state.carts))
    }
  },

  actions: {
    async addCart({ commit, state }, product) {
    // Cập nhật localStorage + state
    commit('add_cart', product)

    try {
      // Kiểm tra sản phẩm đã có trong API chưa
      const exist = state.carts.find(item => item.id === product.id)

      // Gửi yêu cầu GET tới API để kiểm tra
      const res = await axios.get(`http://localhost:3000/cart?id=${product.id}`)
      if (res.data.length > 0) {
        // Nếu có rồi thì PATCH (cập nhật số lượng)
        const existingItem = res.data[0]
        await axios.patch(`http://localhost:3000/cart/${existingItem.id}`, {
          quantity: exist.quantity
        })
      } else {
        // Nếu chưa có thì POST thêm mới
        await axios.post('http://localhost:3000/cart', exist)
      }
    } catch (err) {
      console.error('Lỗi khi lưu vào API:', err)
    }
  },
    async removeCart({ commit }, id) {
      commit('remove_cart', id)
      try {
        await axios.delete(`${API_URL}/${id}`)
      } catch (err) {
        console.error('Lỗi khi xoá trên API:', err)
      }
    },
    async loadCart({ commit }) {
      try {
        const res = await axios.get(API_URL)
        commit('setCart', res.data)
      } catch (err) {
        console.error('Lỗi khi tải cart từ API:', err)
      }
    }
  }
})

export default store