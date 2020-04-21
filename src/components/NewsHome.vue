
<template>
  <div styling="min-height:400px;">
    <b-carousel
      v-if="heroPosts"
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      indicators
      fade
      background="#ababab"
      img-width=1024
      img-height=480
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <div class="hero" v-for="heroPost in heroPosts" :key="heroPost.id">
        <a :href="heroPost.url" target="_blank">
          <b-carousel-slide
            img-height=480
            img-width=1024
            style="height:580px !important"
            :text="heroPost.source.name"
            :caption="heroPost.title"
            :img-src="heroPost.urlToImage"
          >
          </b-carousel-slide>
        </a>
      </div>
    </b-carousel>
    <div class="post">
        <div>
          <b-jumbotron header="News Agent" lead="The Bleeding Edge News Network!">
          </b-jumbotron>
        </div>
        <div v-if="posts" class="container" >
          <div>
            <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
              <b-dropdown-item>First Action</b-dropdown-item>
              <b-dropdown-item>Second Action</b-dropdown-item>
              <b-dropdown-item>Third Action</b-dropdown-item>
            </b-dropdown>
          </div>
          <b-nav-form>
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
            <b-button variant="outline-success" class="my-2 my-sm-0" @click="searchNews()">Search</b-button>
          </b-nav-form>
          <b-overlay :show="this.showOverlay" rounded="sm">
            <div v-if="error" class="error">
              <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
              <p>{{ error }}</p>
            </div>
            <b-card-group columns class="posts-container">
              <div class="posts" v-for="post in posts" :key="post.id">
                  <b-card
                  :img-src='post.urlToImage'
                  img-alt="Image"
                  img-top
                  tag="article"
                  class="mb-3"
                  > 
                  <b-card-title>
                    <a :href="post.url">{{ post.title }}</a>
                  </b-card-title>
                    <b-card-text>
                      {{ post.description }}
                    </b-card-text>
                    <b-card-sub-title>
                      {{post.publishedAt | dateFilter}}
                    </b-card-sub-title>
                    <b-card-text>
                      <b>- {{post.source.name ? post.source.name : ''}} </b>
                    </b-card-text>
                  </b-card>
              </div>
            </b-card-group>
          </b-overlay>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
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
      slide: 0,
      currentPage:1,
      sliding: true,
      perPage:20,
      totalArticles:0,
    }
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
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      }
  },
  filters: {
   dateFilter(item){
      if (!item) return ''
      return moment(item).format('Do MMMM YYYY');
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
