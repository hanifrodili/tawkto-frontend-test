<template>
  <div id="category-wrapper">
    <div class="breadcrumb">
      <div class="breadcrumb-item">
        <router-link to="/">
          <p>All categories</p>
        </router-link>
      </div>
      <i class="fas fa-chevron-right"></i>
      <div class="breadcrumb-item" v-if="categoryData">
        <router-link :to="`/${categoryData.id}`">
          <p>{{ categoryData.title }}</p>
        </router-link>
      </div>
    </div>
    <div class="category-content">
      <div class="card" v-if="categoryData">
        <div class="category-icon">
          <span :class="`fa fa-${categoryData.icon}`"></span>
        </div>
        <div class="category-details">
           <h2 class="category-title">{{ categoryData.title }}</h2>
          <p class="last-update">{{ countSinceTimestamp(categoryData.updatedOn) }}</p>
        </div>
        <hr style="width: 100%; margin: 0 -30px; height: 1px; background-color: #EEE; border: none;">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11 21.7942C16.5228 21.7942 21 17.3396 21 11.8445C21 6.34941 16.5228 1.89478 11 1.89478C5.47715 1.89478 1 6.34941 1 11.8445C1 17.3396 5.47715 21.7942 11 21.7942Z" stroke="#03A84E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11 15.8243V11.8442" stroke="#03A84E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11 7.86804V7.49744" stroke="#03A84E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p class="category-description">{{ categoryData.description }}</p>
      </div>
      <div class="article-list">
        <article-card v-for="(article, index) in articleList" :key="index" :article="article" v-if="article.status==='published'"></article-card>
      </div>
    </div>
    <hr style="
      margin-left: -100%;
      margin-right: -100%;
      border: 0.5px solid #eee;
    ">
    <p class="other-category-heading">Other categories</p>
    <div class="category-slider">
      <div class="prev" @click="prevSlide()">
        <i class="fa fa-chevron-left"></i>
      </div>
      <div class="slider-items" ref="slider">
        <category-card v-for="(category, index) in otherCategories" :key="index" :category="category" v-if="category.enabled"></category-card>
      </div>
      <div class="next" @click="nextSlide()">
        <i class="fa fa-chevron-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import ArticleCard from '../../components/ArticleCard.vue'
import CategoryCard from '../../components/CategoryCard.vue'
import axios from 'axios';

export default {
  components: {
    'article-card': ArticleCard,
    'category-card': CategoryCard
  },
  data: () => ({
    categoryId: null,
    articleList: null,
    categoryData: null,
    otherCategories: null
  }),
  async mounted() {
    this.categoryId = this.$route.params.id;
    await this.getCategory()
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
      const slider =  this.$refs.slider
      slider.scrollLeft -= (180);
    },
    nextSlide() {
      const slider = this.$refs.slider
      slider.scrollLeft += (180);
    },
    async getCategory() {
      this.categoryData = JSON.parse(localStorage.getItem('tawk-data')).find(item => item.id === this.categoryId)
      this.otherCategories = JSON.parse(localStorage.getItem('tawk-data')).filter(item => item.id !== this.categoryId);
      await axios.get(`/api/category/${this.categoryId}`)
        .then((resp) => {
          const data = resp.data
          this.articleList = data
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

  .card{
    border: 1px solid #EEE;
    border-radius: 4px;
    max-width: 280px;
    width: 100%;
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 40px 0px;

    * {
      margin: 0;
    }

    .category-icon .fa {
      font-size: 55px;
      color: transparent;
      -webkit-text-stroke: 2px #03A84E;
      text-shadow: 4px 4px rgba(78, 181, 72, 0.15);
    }

    .category-details {
      text-align: center;

      .category-title {
        color: #373737;
        text-align: center;
        font-size: 20px;
        font-weight: 700;
      }
      .last-update {
        color: #9C9AA6;
        font-size: 11px;
        font-weight: 400;
      }
    }

    .category-description {
      color: #9C9AA6;
      text-align: center;
      font-family: Lato;
      font-size: 13px;
      line-height: 18px;
      max-width: 220px;
      width: 100%;
    }
  }
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}
.other-category-heading {
  color: #999;
  font-size: 22px;
  text-align: center;
  margin: 0;
}
.category-slider {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;

  .prev,
  .next {
    cursor: pointer;
    color: #999;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    background-color: white;
    border-radius: 99px;
  }

  .prev:hover,
  .next:hover {
    background-color: #e5f4e4;
  }
}

.slider-items {
  display: flex;
  flex-direction: row;
  gap: 30px;
  overflow-x: scroll;
  padding: 10px 5px;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;

  #category-card{
    scroll-snap-align: start;
  }
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
}
</style>