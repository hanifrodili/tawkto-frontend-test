<template>
  <div id="article-card">
    <div>
      <i :class="`fa fa-${article.icon} article-icon`"></i>
    </div>
    <div class="article-details">
      <h3 class="article-title">{{ article.title }}</h3>
      <p class="last-update">{{ countSinceTimestamp(article.updatedOn) }}</p>
    </div>
    <i class="fa fa-chevron-right"></i>
  </div>
</template>

<script>
export default {
  props: ['article'],
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
    }
  },
}
</script>

<style lang="scss" scoped>
  #article-card {
    border: 1px solid #EEE;
    border-radius: 4px;
    background-color: #FFF;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    padding: 20px 40px;


    .fa {
      font-size: 17px;
      color: rgba(3, 168, 78, 1);
    }

    .fa.article-icon {
      font-size: 19px;
    }

    .article-details {
      flex-grow: 1;
      font-family: Lato;

      * {
        margin: 0;
      }

      .article-title {
        color: #373737;
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 4px;
      }

      .last-update {
        color: #9C9AA6;
        font-size: 11px;
        font-weight: 400;
        line-height: 22px;
      }
    }
  }
</style>