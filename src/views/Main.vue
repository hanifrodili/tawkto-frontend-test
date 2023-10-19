<template>
  <tawk-category></tawk-category>
</template>

<script>
import Category from '../components/CategorySection.vue'

export default {
  name: 'Main',
  components: {
    'tawk-category': Category
  }
}
</script>