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
    countCart: (state) => state.carts.length,
    totalCart: (state) => state.carts.reduce((total, item) => total + (item.price * item.quantity), 0)
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
    // --- Thêm sản phẩm ---
    async addCart({ commit, state }, product) {
      commit('add_cart', product)

      try {
        const exist = state.carts.find(item => item.id === product.id)
        // Kiểm tra xem sản phẩm đã có trong API chưa
        const res = await axios.get(`${API_URL}?id=${product.id}`)

        if (res.data.length > 0) {
          // Nếu đã có thì cập nhật số lượng (PATCH)
          const itemFromAPI = res.data[0]
          await axios.patch(`${API_URL}/${itemFromAPI.id}`, { quantity: exist.quantity })
        } else {
          // Nếu chưa có thì thêm mới
          await axios.post(API_URL, exist)
        }
      } catch (err) {
        console.error('Lỗi khi lưu vào API:', err)
      }
    }

    // --- Xoá sản phẩm ---
  async removeCart({ commit }, id) {
    commit('remove_cart', id)
    try {
      const res = await axios.get(`${API_URL}?id=${id}`)
      if (res.data.length > 0) {
        await axios.delete(`${API_URL}/${res.data[0].id}`)
      }
    } catch (err) {
      console.error('Lỗi khi xoá trên API:', err)
    }
  }

    // --- Lấy dữ liệu từ API ---
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