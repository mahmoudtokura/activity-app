<template>
  <div>
    <article class="post">
      <h4>{{activity.title}}</h4>
      <div class="media">
        <div class="media-left">
          <p class="image is-32x32">
            <img src="../assets/images/user.png">
          </p>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <a href="#">{{user.name}}</a> updated {{activity.updatedAt}} minutes ago &nbsp;
            </p>
          </div>
        </div>
        <div class="media-right">
          <span>{{activity.progress}}%</span>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'acitivity-item',
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

}
</script>

<style scoped>

</style>