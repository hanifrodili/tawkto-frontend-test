<template>
  <div id="category-card"  @click="gotToCategory()">
    <div class="category-icon">
      <span :class="`fa fa-${category.icon}`"></span>
    </div>
    <h2 class="category-title">{{ category.title }}</h2>
    <div class="category-details">
      <p class="articles-count">{{ category.totalArticle }} articles</p>
      <p class="last-update">{{ countSinceTimestamp(category.updatedOn) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryCard",
  props: ['category'],
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
    gotToCategory() {
      window.location.href = `/category/${this.category.id}`
    }
  },
}
</script>

<style lang="scss" scoped>
  #category-card {
    border: 1px solid #EEE;
    border-radius: 4px;
    min-width: 280px;
    width: 100%;
    height: 220px;
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    cursor: pointer;

    * {
      margin: 0;
    }

    .category-icon .fa {
      font-size: 55px;
      color: #e5f4e4;
      text-shadow: 2px 2px #03A84E;
      -webkit-text-stroke: 2px #03A84E;
      color: rgba(3, 168, 78, 0);
      text-shadow: 4px 4px rgba(78, 181, 72, 0.15);
    }

    .category-title {
      color: #373737;
      text-align: center;
      font-size: 20px;
      font-weight: 700;
    }

    .category-details {
      text-align: center;

      .articles-count {
        color: #03A84E;
        font-size: 13px;
        font-weight: 400;
      }
      .last-update {
        color: #9C9AA6;
        font-size: 11px;
        font-weight: 400;
      }
    }
  }

  #category-card:hover {
    .category-title {
      text-decoration: underline;
    }
  }

  @media (max-width: 460px) {
   #category-card {
    min-width: 100%;
   }
}
</style>