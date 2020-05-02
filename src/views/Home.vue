<template>
  <div class="home">
      <NewsHome :heroPosts="heroPosts"/>
  </div>
</template>

<script>
// @ is an alias to /src
import NewsHome from '@/components/NewsHome.vue'

export default {
  name: 'Home',
  components: {
    NewsHome
  },
  mounted() {
    // this.FetchHeroPosts()
    this.$store.dispatch('_GET_HERO_POSTS')
  },
  computed:{
    heroPosts() {
      return this.$store.getters.HEROPOSTS
    }
  }
}
</script>
