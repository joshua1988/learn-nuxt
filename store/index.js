import axios from 'axios'

export const state = () => ({
  carts: [],
})

export const mutations = {
  addItemToCart(state, item) {
    state.carts.push(item)
  },
  setCarts(state, carts) {
    state.carts = carts
  },
}

export const actions = {
  async fetchCarts(context) {
    const { data } = await axios.get('http://localhost:3000/carts')
    const items = data.map((item) => ({
      ...item,
      imageUrl: `${item.imageUrl}?random=${Math.random()}`,
    }))
    context.commit('setCarts', items)
  },
}
