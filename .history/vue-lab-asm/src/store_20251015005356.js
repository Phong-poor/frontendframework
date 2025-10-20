import { createStore } from 'vuex'
import axios from 'axios'

const API_URL = 'http://localhost:3000/cart'

function saveToLocalStorage(carts) {
  localStorage.setItem('cart', JSON.stringify(carts))
}

export default createStore({
  state() {
    return {
      carts: JSON.parse(localStorage.getItem('cart') || '[]'),
      loading: false,
      error: null
    }
  },

  getters: {
    countCart: (state) => state.carts.length,
    totalCart: (state) => state.carts.reduce((total, item) => total + (item.price * item.quantity), 0)
  },

  mutations: {
    set_carts(state, carts) {
      state.carts = carts
      saveToLocalStorage(carts)
    },

    add_cart(state, payload) {
      const { id } = payload
      const existItem = state.carts.find(item => item.id === id)

      if (existItem) {
        existItem.quantity++
      } else {
        state.carts.push({ ...payload, quantity: 1 })
      }

      saveToLocalStorage(state.carts)
    },

    remove_cart(state, id) {
      state.carts = state.carts.filter(item => item.id !== id)
      saveToLocalStorage(state.carts)
    },

    clear_cart(state) {
      state.carts = []
      localStorage.removeItem('cart')
    }
  },

  actions: {
    // Gọi khi user thêm sản phẩm
    async addCart({ commit, state }, product) {
      commit('add_cart', product)

      try {
        const exist = await axios.get(`${API_URL}?id=${product.id}`)
        if (exist.data.length > 0) {
          // Đã có trong API -> PATCH số lượng
          const serverItem = exist.data[0]
          await axios.patch(`${API_URL}/${serverItem.id}`, {
            quantity: serverItem.quantity + 1
          })
        } else {
          // Chưa có -> POST mới
          await axios.post(API_URL, { ...product, quantity: 1 })
        }
      } catch (error) {
        console.error('Lỗi khi cập nhật API:', error)
      }
    },

    async removeCart({ commit }, id) {
      commit('remove_cart', id)
      try {
        await axios.delete(`${API_URL}/${id}`)
      } catch (error) {
        console.error('Lỗi khi xóa sản phẩm trong API:', error)
      }
    },

    async loadCart({ commit }) {
      try {
        const response = await axios.get(API_URL)
        if (response.status === 200) {
          commit('set_carts', response.data)
        }
      } catch (error) {
        console.error('Lỗi khi tải giỏ hàng:', error)
      }
    }
  }
})