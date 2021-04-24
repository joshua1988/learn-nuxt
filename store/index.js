export const state = () => ({
  carts: [],
})

export const mutations = {
  addItemToCart(state, item) {
    state.carts.push(item)
  },
}
