<template>
  <div class="home">
      <NewsHome :heroPosts="heroPosts"/>
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
      heroPosts:[]
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
      })
    }
  }
}
</script>
