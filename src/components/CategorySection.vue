<template>
  <div id="category-wrapper">
    <category-card v-for="(category, index) in categoryList" :key="index" :category="category" v-if="category.enabled"></category-card>
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
  async mounted() {
   await axios.get('/api/categories')
    .then((resp) => {
      const data = resp.data
      localStorage.setItem('tawk-data', JSON.stringify(data))
      this.categoryList = data.sort((current, next) => current.order - next.order)
    })
    .catch((error) => {
      console.log(error); 
    })

    if (this.$route.query.search) {
      const filtered = this.categoryList.filter(item => item.title.toLowerCase().includes(this.$route.query.search.toLowerCase()));
      this.categoryList = filtered
    }
  },
}
</script>

<style lang="scss" scoped>
  #category-wrapper {
    background-color: #FAFAFA;
    padding: 60px 148px;
    font-family: 'Lato', Arial, Helvetica, sans-serif;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }

  @media (max-width: 460px) {
    #category-wrapper {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px;
      padding: 60px 20px;
    }
  }
</style>