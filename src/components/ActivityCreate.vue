<template>
  <div class="create-form">
    <a v-if="showActivityForm != true"
       class="button is-primary is-block is-alt is-large"
       href="#"
       @click="toggleAddActivityForm">
      New Activity
    </a>
    <form v-if="showActivityForm">
      <h2>Create Activity</h2>
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input
            v-model="activityFormData.title"
            class="input"
            type="text"
            placeholder="Read a Book">
        </div>
      </div>
      <div class="field">
        <label class="label">Note</label>
        <div class="control">
          <textarea
            id=""
            v-model="activityFormData.note"
            class="textarea"
            name=""
            cols="30"
            rows="5"
            placeholder="Add a note" />
        </div>
      </div>
      <div class="field">
        <label class="label">Categories</label>
        <div class="control">
          <select id="" v-model="activityFormData.category" name="category_select">
            <option value="" disabled>Select a category</option>
            <option v-for="category in categories" 
                    :key="category.id"
                    :value="category.id">
              {{ category.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link"
                  :disabled="!validateActivityForm"
                  @click.prevent="addNewActivity">
            Create Activity
          </button>
        </div>
        <div class="control">
          <button class="button is-text"
                  @click.prevent="toggleAddActivityForm">
            Cancel
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'activity-create',
  props: {
    categories: {
      type: Object,
      required: true,
    }
  },
  data() {
    return { 
      activityFormData: {
        title: '',
        note: '',
        category: '',
      },
      showActivityForm: false,
    }
  },
  computed: {
    validateActivityForm() {
      return this.activityFormData.title && this.activityFormData.note && this.activityFormData.category;
    },
  },
  methods: {
    resetActivityForm() {
      this.activityFormData.title = ''
      this.activityFormData.note = ''
      this.activityFormData.category = ''
    },
    addNewActivity() {
      if(this.validateActivityForm) {
        this.$emit('addNewActivity', {...this.activityFormData})
      }
      this.resetActivityForm()
      this.toggleAddActivityForm()
    },
    toggleAddActivityForm() {
      this.showActivityForm = !this.showActivityForm;
    },
  }

}
</script>

<style>

</style>