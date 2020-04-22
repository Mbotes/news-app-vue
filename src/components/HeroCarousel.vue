<template>
  <b-carousel
    v-if="heroPosts"
    id="carousel-1"
    v-model="slide"
    :interval="4000"
    indicators
    controls
    fade
    background="#ababab"
    img-width="1024"
    img-height="480"
    style="text-shadow: 1px 1px 2px #333;"
    @sliding-start="onSlideStart"
    @sliding-end="onSlideEnd"
  >
    <div class="hero" v-for="heroPost in heroPosts" :key="heroPost.id">
      <a :href="heroPost.url" target="_blank">
        <b-carousel-slide
          img-height="480"
          img-width="1024"
          style="height:580px !important"
          :text="heroPost.publishedAt | dateFilter"
          :caption="heroPost.title"
          :img-src="heroPost.urlToImage"
        ></b-carousel-slide>
      </a>
    </div>
  </b-carousel>
</template>
<script>
import moment from "moment";
export default {
  name: "HeroCarousel",
  props: {
    heroPosts: Array
  },
  data() {
    return {
      sliding: true,
      slide: 0
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    }
  },
  filters: {
    dateFilter(item) {
      if (!item) return "";
      return moment(item).format("Do MMMM YYYY");
    }
  }
};
</script>