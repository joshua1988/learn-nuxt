<template>
  <div>
    <main>
      <SearchInput
        v-model="inputText"
        @search="filterItemsBySearchText"
      ></SearchInput>
      <ul>
        <li
          v-for="item in items"
          :key="item.id"
          class="item flex"
          @click="routeToDetailPage(item.id)"
        >
          <img class="product-image" :src="item.imageUrl" alt="" />
          <p>{{ item.name }}</p>
          <span>{{ item.price }}</span>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import SearchInput from '@/components/SearchInput.vue'
// import { debounce } from 'lodash'

export default {
  components: { SearchInput },

  async asyncData() {
    try {
      const { data } = await axios.get('http://localhost:3000/products')
      const items = data.map((item) => ({
        ...item,
        imageUrl: `${item.imageUrl}?random=${Math.random()}`,
      }))
      return { items }
    } catch (error) {
      const items = []
      return { items }
    }
  },

  data() {
    return {
      inputText: '',
    }
  },

  methods: {
    async filterItemsBySearchText() {
      const { data } = await axios.get('http://localhost:3000/products', {
        params: {
          name_like: this.inputText,
        },
      })
      this.items = data.map((item) => ({
        ...item,
        imageUrl: `${item.imageUrl}?random=${Math.random()}`,
      }))
    },
    routeToDetailPage(id) {
      this.$router.push(`/products/${id}`)
    },
  },
}
</script>

<style scoped>
/* utils */
.input-wrapper {
  height: 40px;
  margin: 1rem 0;
}
.flex {
  display: flex;
  justify-content: center;
}
.item {
  display: inline-block;
  width: 400px;
  height: 300px;
  text-align: center;
  margin: 0 0.5rem;
  cursor: pointer;
}
.product-image {
  width: 400px;
  height: 250px;
}
</style>
