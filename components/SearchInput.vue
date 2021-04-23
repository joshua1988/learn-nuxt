<template>
  <div class="input-wrapper flex">
    <input
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @keyup.enter.exact="$emit('search')"
    />
    <button type="button" @click="$emit('search')">search</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
  },
}
</script>

<style></style>
