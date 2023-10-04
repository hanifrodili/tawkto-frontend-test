<template>
  <div id="category-card">
    <div class="category-icon">
      <span :class="`fa fa-${category.icon}`"></span>
    </div>
    <h2 class="category-title">{{ category.title }}</h2>
    <div class="category-details">
      <p class="articles-count">{{ category.totalArticle }} articles</p>
      <p class="last-update">Last update {{ countDaysSinceTimestamp(category.updatedOn) }} days ago</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryCard",
  props: ['category'],
  methods: {
    countDaysSinceTimestamp(timestamp) {
      const date = new Date(timestamp);

      const currentDate = new Date();

      const timeDifference = currentDate - date;

      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      return daysDifference;
    }
  },
}
</script>

<style lang="scss">
  #category-card {
    border: 1px solid #EEE;
    border-radius: 4px;
    width: 315px;
    height: 220px;
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    * {
      margin: 0;
    }

    .category-icon .fa {
      font-size: 55px;
      color: transparent;
      -webkit-text-stroke: 1px #03A84E;
      text-shadow: 6px 6px rgba(78, 181, 72, 0.15);
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
</style>