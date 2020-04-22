<template>
  <b-overlay :show="this.showOverlay" rounded="sm" style="margin:2rem 0;">
    <div v-if="error" class="error">
      <b-alert show variant="danger">
        <h4 class="alert-heading">OOPS!</h4>
        <p>We're sorry, we're not able to retrieve this information at the moment, please see the below error</p>
        <hr />
        <p class="mb-0">{{ error }}</p>
      </b-alert>
    </div>
    <b-card-group columns class="posts-container">
      <div class="posts" v-for="post in posts" :key="post.id">
        <b-card :img-src="post.urlToImage" img-alt="Image" img-top tag="article" class="mb-3">
          <b-card-title>
            <a :href="post.url" target="_blank">{{ post.title }}</a>
          </b-card-title>
          <b-card-text>{{ post.description }}</b-card-text>
          <b-card-sub-title>{{post.publishedAt | dateFilter}}</b-card-sub-title>
          <b-card-text>
            <b>- {{post.source.name ? post.source.name : ''}}</b>
          </b-card-text>
        </b-card>
      </div>
    </b-card-group>
    <div v-if="noPosts" class="error">
      <b-alert show variant="info">
        <p>
          You've reached the end!
          <b-icon-arrow-clockwise></b-icon-arrow-clockwise>
        </p>
        <p
          v-if="developerLimit"
        >Unfortunately the developer server limit of 100 posts per scroll was hit <b-icon-server></b-icon-server>. Try search for something new<b-icon-shift></b-icon-shift>.</p>
      </b-alert>
    </div>
    <div v-if="noSearchResults" class="error">
      <b-alert show variant="warning">
        No search results found! try using a simpler or broader search term/s for the news api to understand.
        <b-icon-question-octagon-fill></b-icon-question-octagon-fill>
      </b-alert>
    </div>
  </b-overlay>
</template>
<script>
import moment from "moment";
export default {
  name: "Posts",
  props: {
    msg: String,
    posts: Array,
    showOverlay: Boolean,
    error: String,
    noSearchResults: Boolean,
    noPosts: Boolean,
    developerLimit: Boolean
  },
  filters: {
    dateFilter(item) {
      if (!item) return "";
      return moment(item).format("Do MMMM YYYY");
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.posts-container {
  margin: 20px 0;
}
</style>