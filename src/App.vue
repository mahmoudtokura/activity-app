<template>
  <div id="app">
    <nav class="navbar is-white topNav">
      <div class="container">
        <div class="navbar-brand">
          <h1>{{ fullAppName }}</h1>
        </div>
      </div>
    </nav>
    <navbar />
    <section class="container">
      <half-circle-spinner
        v-if="isLoading"
        class="spinner"
        :animation-duration="1000"
        :size="60"
        color="#5facff"
      />
      <div v-else class="columns">
        <div class="column is-3">
          <!-- Activity form -->
          <activity-create
            :categories="categories"
            @addNewActivity="addNewActivity" />
          <!-- Activity form end -->
        </div>
        <div class="column is-9">
          <div class="box content">
            <activity-item
              v-for="activity in activities"
              :key="activity.id"
              :activity="activity"
              :user="user"
              @activityDeleted="handleActivityDelete"
            />
            <div class="activity-lenght">Currently {{ activityLenght }} activities</div>
            <div class="activity-motivation">{{ activityMotivation }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ActivityItem from '@/components/ActivityItem';
import ActivityCreate from '@/components/ActivityCreate';
import Navbar from '@/components/Navbar';
import { HalfCircleSpinner } from 'epic-spinners';
import { fetchActivities, fetchUser, fetchCategories, postActivity, deleteActivityAPI } from '@/services';
export default {
  name: 'app',
  components: { ActivityItem, ActivityCreate, Navbar, HalfCircleSpinner },
  data() {
    return {
      creator: 'Mahmoud Tokura',
      appName: 'Activity Planner',
      isTextDisplayed: true,
      user: {},
      activities: {},
      categories: {},
      isLoading: false,
      errorMessage: '',
    }
  },
  computed: {
    fullAppName() {
      return `${this.appName} by ${this.creator}`
    },
    activityLenght() {
      return Object.keys(this.activities).length;
    },
    activityMotivation() {
      if(this.activityLenght && this.activityLenght < 5) {
        return "Nice to see some activity";
      } else if (this.activityLenght && this.activityLenght >= 5) { 
        return "So many activitites! You are going well";
      } else {
        return "Obgeni!!! You no get Activity";
      }
    }
  },
  created() {
    this.isLoading = true;
    fetchActivities()
    .then(response => {
      this.activities = response
      this.isLoading = false
    })
    .catch(error =>{
      this.errorMessage = error
      this.isLoading = false
    })

    fetchUser()
    .then(response => {
      this.users = response
    })
    .catch(error =>{
      this.errorMessage = error
      this.isLoading = false
    })

    fetchCategories()
    .then(response => {
      this.categories = response
    })
    .catch(error =>{
      this.errorMessage = error
      this.isLoading = false
    });
  },
  methods: {
    addNewActivity(activity) {
      postActivity(activity)
    },
    handleActivityDelete (activity) {
      deleteActivityAPI(activity)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html,body {
    font-family: 'Open Sans', serif;
    background: #F2F6FA;
  }
  footer {
    background-color: #F2F6FA !important;
  }
  .topNav {
    border-top: 5px solid #3498DB;
  }
  .topNav .container {
    border-bottom: 1px solid #E6EAEE;
  }
  .container .columns {
    margin: 3rem 0;
  }
  .navbar-menu .navbar-item {
    padding: 0 2rem;
  }
  aside.menu {
    padding-top: 3rem;
  }
  aside.menu .menu-list {
    line-height: 1.5;
  }
  aside.menu .menu-label {
    padding-left: 10px;
    font-weight: 700;
  }
  .button.is-primary.is-alt {
    background: #00c6ff;
    background: -webkit-linear-gradient(to bottom, #0072ff, #00c6ff);
    background: linear-gradient(to bottom, #0072ff, #00c6ff);
    font-weight: 700;
    font-size: 14px;
    height: 3rem;
    line-height: 2.8;
  }
  .media-left img {
    border-radius: 50%;
  }
  .media-content p {
    font-size: 14px;
    line-height: 2.3;
    font-weight: 700;
    color: #8F99A3;
  }
  article.post {
    margin: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #E6EAEE;
  }
  article.post:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
  .menu-list li{
    padding: 5px;
  }
  
  .navbar-brand > h1 {
    font-size: 31px;
    padding: 20px;
  }

  .activity-lenght {
    display: inline-block;
  }
  .activity-motivation {
    float: right
  }
  /* Absolute Center Spinner */
  .spinner {
    position: fixed;
    z-index: 999;
    overflow: show;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 50px;
    height: 50px;
  }

  /* Transparent Overlay */
  .spinner:before {
    content: '';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(58, 58, 58, 0.5);
  }
</style>
