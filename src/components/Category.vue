<template>
  <div id="category-wrapper">
    <category-card  v-for="(category, index) in categoryList" :key="index" :category="category" v-if="category.enabled"></category-card>
  </div>
</template>

<script>
import CategoryCard from './CategoryCard.vue'
import axios from 'axios';

export default {
  name: 'Category',
  components: {
    'category-card': CategoryCard
  },
  data: () => ({
    categoryList: null
  }),
  mounted() {
   axios.get('/api/categories')
    .then((resp) => {
      this.categoryList = resp.data
      console.log(resp.data);
    })
      .catch((error) => {
        console.log(error); 
      })
  },
}
</script>

<style lang="scss">
  #category-wrapper {
    background-color: #FAFAFA;
    padding: 60px 148px;
    font-family: 'Lato', Arial, Helvetica, sans-serif;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }
</style>