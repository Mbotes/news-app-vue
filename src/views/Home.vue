<template>
  <div class="home">
    <b-overlay :show="this.showHomeOverlay" rounded="sm">
      <NewsHome :heroPosts="heroPosts"/>
    </b-overlay>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import NewsHome from '@/components/NewsHome.vue'
import Footer from '@/components/Footer.vue'
import axios from 'axios'

export default {
  data (){
    return{
      heroPosts:[],
      showHomeOverlay:true
    }
  },
  name: 'Home',
  components: {
    NewsHome,
    Footer
  },
  mounted() {
    this.FetchHeroPosts()
  },
  methods:{
    FetchHeroPosts(){
      axios.get('http://newsapi.org/v2/top-headlines?country=us&sortBy=popularity&page=1&apiKey=15105666e9fe426d838014145956acd4')
      .then(response => {
        console.log(response)
        this.heroPosts = response.data.articles.slice(0, 5);
      })
      .catch(error => {
        console.log(error)
      }).finally(() => this.showHomeOverlay = false)
    }
  }
}
</script>
