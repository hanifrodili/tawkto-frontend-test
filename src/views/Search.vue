<template>
  <div id="category-wrapper">
    <div class="breadcrumb">
      <div class="breadcrumb-item">
        <router-link to="/">
          <p>All categories</p>
        </router-link>
      </div>
      <i class="fas fa-chevron-right"></i>
      <div class="breadcrumb-item">
        <p>Search results</p>
      </div>
    </div>
    <div class="category-content">
      <div class="article-list">
          <article-card v-for="(article, index) in articleList" :key="index" :article="article" v-if="article.status === 'published'"></article-card>
        </div>
    </div>
    <hr style="
      margin-left: -100%;
      margin-right: -100%;
      border: 0.5px solid #eee;
    ">
  </div>
</template>

<script>
import { ref } from 'vue';
import ArticleCard from '../components/ArticleCard.vue'
import axios from 'axios';

export default {
  name: 'Search',
  components: {
    'article-card': ArticleCard
  },
  data: () => ({
    query: null,
    articleList: null
  }),
  async mounted() {
    this.query = this.$route.query.key;
    console.log(this.query);
    await this.getSearch()
  },
  methods: {
    countSinceTimestamp(timestamp) {
      const date = new Date(timestamp);
      let unit = 'days'
      const currentDate = new Date();
      const timeDifference = currentDate - date;
      let difference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      if (difference > 7) {
        difference = Math.floor(difference / 7)
        unit = 'weeks'
      }
      if (difference > 30) {
        difference = Math.floor(difference / 30)
        unit = 'months'
      }
      return `Last update ${difference} ${unit} ago`;
    },
    prevSlide() {
      const slider = this.$refs.slider
      slider.scrollLeft -= (180);
    },
    nextSlide() {
      const slider = this.$refs.slider
      slider.scrollLeft += (180);
    },
    async getSearch() {
      await axios.get(`/api/search/${this.query}`)
        .then((resp) => {
          const data = resp.data
          const filtered = data.filter(item => item.title.toLowerCase().includes(this.query.toLowerCase()));
          this.articleList = filtered
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }
}
</script>

<style lang="scss" scoped>
#category-wrapper {
  font-family: 'Lato', Arial, Helvetica, sans-serif;
  background-color: #FAFAFA;
  padding: 60px 148px;
  display: flex;
  flex-direction: column;
  gap: 22px;

}

.breadcrumb {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
  font-family: "Lato";

  i {
    font-size: 8px;
    color: #D3D3D3;
  }
}

.breadcrumb-item {
  display: flex;
  flex-direction: row;
  align-items: center;

  a {
    text-decoration: none;
  }

  p {
    margin: 0;
    color: #03A84E;
    font-size: 13px;
    line-height: 22px;
  }
}

.breadcrumb-item:last-of-type {
  p {
    color: #9C9AA6;
  }
}

.category-content {
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 60px;
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

@media (max-width: 460px) {
  #category-wrapper {
    padding: 60px 20px;
  }

  .category-content {
    flex-direction: column;

    .card {
      max-width: 100%;
    }
  }
}</style>