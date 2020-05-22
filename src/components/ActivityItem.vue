<template>
  <div>
    <article class="post">
      <div class="activity-title-wrapper">
        <h4 class="activity-title">{{ activity.title }}</h4>
        <i class="fas fa-cog activity-settings" @click="isMenuDisplayed = !isMenuDisplayed" />
      </div>
      <p>{{ textUtility_capitalize(getCategory(activity.category).text) }}</p>
      <p>{{ activity.notes }}</p>
      <div class="media">
        <div class="media-left">
          <p class="image is-32x32">
            <img src="../assets/images/user.png">
          </p>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <a href="#">{{ user.name }}</a> updated {{ activity.updatedAt | date }} &nbsp;
            </p>
          </div>
        </div>
        <div class="media-right">
          Progress:<span :style="{color: progressColor}"> {{ activity.progress }} %</span>
        </div>
      </div>
      <div v-if="isMenuDisplayed" class="activity-controll">
        <a class="button is-warning">Edit</a>
        <a class="button is-danger" @click="deleteActivity">Delete</a>
      </div>
      <hr>
    </article>
  </div>
</template>

<script>
import { fetchCategory } from '../services'
import textUtility from '../mixins/textUtility'
export default {
  name: 'acitivity-item',
  mixins: [textUtility],
  props: {
    activity: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isMenuDisplayed: false
    }
  },
  computed:{
    progressColor() {
      if(this.activity.progress <= 0) {
        return 'red'
      } else if (this.activity.progress <= 50) {
        return 'orange'
      } else {
        return 'green'
      }
    }
  },
  methods: {
    getCategory(catId) {
      return fetchCategory(catId)
    },
    deleteActivity () {
      this.$emit('activityDeleted', this.activity)
    }
  }
}
</script>

<style lang="scss" scoped>
  .activity-title {
    margin-bottom: 5px;
    display: inline-block;
  }
  .activity-settings {
    float: right;
    font-size: 22px;
    &:hover {
      cursor: pointer;
    }
  }
  .activity-controll {
    margin: 20px 0 0 0;
    a {
      margin-right: 5px;
    }
  }
  .post .title {
    margin-bottom: 4px;
  }
</style>