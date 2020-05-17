<template>
  <div id="app">
    <nav class="navbar is-white topNav">
      <div class="container">
        <div class="navbar-brand">
          <h1>Activity Planner</h1>
        </div>
      </div>
    </nav>
    <nav class="navbar is-white">
      <div class="container">
        <div class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item is-active" href="#">Newest</a>
            <a class="navbar-item" href="#">In Progress</a>
            <a class="navbar-item" href="#">Finished</a>
          </div>
        </div>
      </div>
    </nav>
    <section class="container">
      <h1 :title="titleMessage"></h1>
      <div class="columns">
        <div class="column is-3">
          <a class="button is-primary is-block is-alt is-large"
          href="#"
          @click="toggleAddActivityForm"
          v-if="this.showActivityForm != true">New Activity</a>
          <div class="create-form" v-if="showActivityForm">
            <h2>Create Activity</h2>
            <form>
              <div class="field">
                <label class="label">Title</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Read a Book" v-model="activityFormData.title">
                </div>
              </div>
              <div class="field">
                <label class="label">Note</label>
                <div class="control">
                  <textarea class="textarea" name="" id="" cols="30" rows="10" v-model="activityFormData.note" placeholder="Add a note"></textarea>
                </div>
              </div>
              <div class="field is-grouped">
                <div class="control">
                  <button class="button is-link" @click.prevent="addNewActivity">Create Activity</button>
                </div>
                <div class="control">
                  <button class="button is-text" @click.prevent="toggleAddActivityForm">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="column is-9">
          <div class="box content">
            <activity-item
            v-for="activity in activities"
            :key="activity.id"
            :activity="activity"
            :user="user"
            >
          </activity-item>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ActivityItem from '@/components/ActivityItem'
export default {
  name: 'app',
  components: { ActivityItem },
  data() {
    return {
      message: 'Hello Vue!',
      titleMessage: 'Title Message Vue!!!!!',
      isTextDisplayed: true,
      user: {
        name: 'Mahmoud Tokura',
        id: '-Aj34jknvncx98812',
      },
      activities: {
        '1546968934': {
          id: '1546968934',
          title: 'Learn Vue.js',
          notes: 'I started today and it was not good.',
          progress: 0,
          category: '1546969049',
          createdAt: 1546969144391,
          updatedAt: 1546969144391
        },
        '1546969212': {
          id: '1546969212',
          title: 'Read Witcher Books',
          notes: 'These books are super nice',
          progress: 0,
          category: '1546969049',
          createdAt: 1546969144391,
          updatedAt: 1546969144391
        }
      },
      categories: {
        '1546969049': {text: 'books'},
        '1546969225': {text: 'movies'}
      },
      showActivityForm: false,
      activityFormData: {
        title: '',
        note: '',
      }
    }
  },
  methods: {
    validateActivityForm() {
      return this.activityFormData.title.length > 0 && this.activityFormData.note.length > 0;
    },
    resetActivityForm() {
      this.activityFormData.title = ''
    },
    toggleAddActivityForm() {
      this.showActivityForm = !this.showActivityForm;
    },
    addNewActivity() {
      if(this.validateActivityForm()) {
        const newActivity = {
          title: this.activityFormData.title,
          notes: this.activityFormData.note,
          progress: 0,
          category: '1546969049',
          createdAt: new Date(),
          updatedAt: new Date()
        }
        this.activities = {...this.activities, newActivity}
      }
      this.resetActivityForm()
      this.toggleAddActivityForm()
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
</style>
