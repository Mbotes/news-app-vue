
<template>
  <div styling="min-height:400px;" class="container">
    <HeroCarousel :heroPosts="this.heroPosts"/>
    <div class="post">
      <div>
        <b-jumbotron header="News Agent" lead="The Bleeding Edge News Network!">
        </b-jumbotron>
      </div>
      <div v-if="posts" class="container" >
        <b-button v-b-toggle.sidebar-no-header>Toggle Sidebar</b-button>
        <b-nav-form>
         
  
        </b-nav-form>
        <Posts :posts="this.posts" :showOverlay="this.showOverlay" :error="this.error"/>
      </div>
    </div>
    <div>

      <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow>
        <template v-slot:default="{ hide }">
          <div class="p-3">
            <h4 id="sidebar-no-header-title">Custom header sidebar</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
              in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </p>
            <nav class="mb-3">
              <b-nav vertical>
                <b-nav-item active @click="hide">Active</b-nav-item>
                <b-nav-item href="#link-1" @click="hide">Link</b-nav-item>
                <b-nav-item href="#link-2" @click="hide">Another Link</b-nav-item>
              </b-nav>
            </nav>
            <b-form-input class="mr-sm-2" v-model="searchText" placeholder="Search" debounce="500"></b-form-input>
            <b-form-datepicker 
            id="example-datepicker" 
            v-model="datePicker" 
            class="mr-sm-2"
            :max="dateMax"
            today-button
            reset-button
            close-button>
            </b-form-datepicker>
            <b-button variant="primary" block @click="searchNews(), hide()">Search</b-button>
            <b-button variant="outline-primary" block @click="clearFields(), hide()">Reset</b-button>
            <b-button variant="outline-primary" block @click="hide()">Close</b-button>
          </div>
        </template>
      </b-sidebar>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import Posts from '@/components/Posts.vue'
import HeroCarousel from '@/components/HeroCarousel.vue';
export default {
  data (){
    const nowDate = new Date()
    const today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate())
    const maxDate = new Date(today)
    return {
      posts: [],
      error:null,
      showOverlay: true,
      datePicker: today,
      dateMax:maxDate,
      searchText: "",
      currentPage:1,
      perPage:20,
      totalArticles:0,
    }
  },
  components: {
    Posts,
    HeroCarousel
  },
  name: 'NewsHome',
  props: {
    heroPosts: Array
  },
  mounted() {
    this.fetchData()
    this.scroll()
  },
  watch: {
    '$route':'fetchData'
  },
  methods:{
    scroll(){
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          let checkPage = (this.totalArticles / this.perPage)
          checkPage = Math.round(checkPage);
          console.log(checkPage);
          if (this.currentPage < checkPage){
            this.currentPage++
            this.showOverlay = true

            axios.get(`http://newsapi.org/v2/top-headlines?country=za&sortBy=popularity&page=${this.currentPage}&apiKey=15105666e9fe426d838014145956acd4`)
            .then(response => {
                console.log(response)
                this.posts = this.posts.concat(response.data.articles);
                this.error = null;
            })
            .catch(error => {
              console.log(error)
              this.error = error
            }).finally(() => this.showOverlay = false)
          }
        }
      }
    },
    fetchData() {
      this.showOverlay = true

      axios.get(`http://newsapi.org/v2/top-headlines?country=za&sortBy=popularity&apiKey=15105666e9fe426d838014145956acd4`)
      .then(response => {
        console.log(response)
          this.totalArticles = response.data.totalResults
          this.posts = response.data.articles
          this.error = null;
      })
      .catch(error => {
        console.log(error)
        this.error = error
      }).finally(() => this.showOverlay = false)
    },
    searchNews() {
      this.showOverlay = true
      this.posts = []
      const text = this.searchText;
      axios.get(`http://newsapi.org/v2/everything?q=${text}&from=${this.datePicker}&apiKey=15105666e9fe426d838014145956acd4`)
      .then(response => {
        console.log(response)
        this.error = null;
        this.posts = response.data.articles
      })
      .catch(error => {
        console.log(error)
        this.error = error
      }).finally(() => this.showOverlay = false)
    },
    clearFields(){
      this.posts = []
      this.searchText = ""
      const newDate = new Date()
      const todayDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate())
      this.datePicker = todayDate
      this.fetchData()
    }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.posts-container {
  margin: 20px 0;
}
</style>
