
<template>
  <div styling="min-height:400px;" class="container">
    <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" backdrop shadow>
      <template v-slot:default="{ hide }">
        <div class="p-3">
          <h4 id="sidebar-no-header-title">Filter News</h4>
          <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group
              id="input-group-1"
              label="Search:"
              label-for="tags-basic"
              description="Keywords: Trump, Oil prices, Disney etc."
            >
              <b-form-tags
                input-id="tags-basic"
                remove-on-delete
                v-model="form.searchText"
                class="mb-2"
                placeholder="Keyword search"
                required
              ></b-form-tags>
            </b-form-group>

            <b-form-group id="input-group-2" label="From Date:" label-for="input-2">
              <b-form-datepicker
                id="from-datepicker"
                v-model="form.fromDatePicker"
                class="mr-sm-2"
                :max="dateMax"
                :min="dateMin"
                today-button
                reset-button
                close-button
              ></b-form-datepicker>
            </b-form-group>

            <b-form-group id="input-group-2" label="Till Date:" label-for="input-2">
              <b-form-datepicker
                id="till-datepicker"
                v-model="form.tillDatePicker"
                class="mr-sm-2"
                :max="dateMax"
                :min="dateMin"
                today-button
                reset-button
                close-button
              ></b-form-datepicker>
            </b-form-group>

            <b-form-group id="input-group-3" label="Filter by:" label-for="input-3" description="relevancy = articles more closely related to search terms come first,
popularity = articles from popular sources and publishers come first,
date = latest articles come first.">
              <b-form-select id="input-3" v-model="form.sortBy" :options="sortByFields" required  ></b-form-select>

            </b-form-group>

            <b-button type="submit" variant="primary" block>Search</b-button>
            <b-button type="reset" variant="outline-danger" block @click="hide()">Reset</b-button>
            <b-button variant="outline-warning" block @click="hide()">Close</b-button>
          </b-form>
        </div>
      </template>
    </b-sidebar>
    <HeroCarousel :heroPosts="this.heroPosts" />
    <div class="post">
      <div>
        <b-jumbotron header="News Agent" lead="The Bleeding Edge News Network!"></b-jumbotron>
      </div>
    </div>
    <b-button block v-b-toggle.sidebar-no-header variant="outline-primary">
      Filter News Content
      <b-icon-filter></b-icon-filter>
    </b-button>
    <div v-if="posts" class="container">
      <div>
        <Posts
          :posts="this.posts"
          :showOverlay="this.showOverlay"
          :error="this.error"
          :noPosts="this.noPosts"
          :noSearchResults="this.noSearchResults"
          :developerLimit="this.developerLimit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Posts from "@/components/Posts.vue";
import HeroCarousel from "@/components/HeroCarousel.vue";
export default {
  data() {
    const nowDate = new Date();
    const today = new Date(
      nowDate.getFullYear(),
      nowDate.getMonth(),
      nowDate.getDate()
    );
    const maxDate = new Date(today);
    const minDate = new Date(today);
    minDate.setMonth(minDate.getMonth() - 1);
    return {
      posts: [],
      error: null,
      showOverlay: true,
      dateMax: maxDate,
      dateMin: minDate,
      currentPage: 1,
      perPage: 20,
      totalArticles: 0,
      noSearchResults: false,
      noPosts: false,
      developerLimit: false,
      form: {
        searchText: [],
        fromDatePicker: today,
        tillDatePicker: today,
        sortBy: null,
        checked: []
      },
      sortByFields: [
        { text: "Relevancy", value: "relevancy" },
        { text: "Popularity", value: "popularity" },
        { text: "Date", value: "publishedAt" }
      ]
    };
  },
  components: {
    Posts,
    HeroCarousel
  },
  name: "NewsHome",
  props: {
    heroPosts: Array
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    nullWindowsScroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          return true;
        }
      };
    },
    headlinesScroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          let checkPage = this.totalArticles / this.perPage;
          checkPage = Math.round(checkPage);
          if (this.currentPage < checkPage) {
            this.currentPage++;
            this.showOverlay = true;

            axios
              .get(
                `http://newsapi.org/v2/top-headlines?country=za&sortBy=popularity&page=${this.currentPage}&apiKey=15105666e9fe426d838014145956acd4`
              )
              .then(response => {
                console.log(response);
                this.totalArticles = response.data.totalResults;
                this.posts = this.posts.concat(response.data.articles);
                this.error = null;
              })
              .catch(error => {
                console.log(error);
                this.error = error;
              })
              .finally(() => {
                this.showOverlay = false;
              });
          } else {
            this.noPosts = true;
          }
        }
      };
    },
    everythingScroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          let checkPage = this.totalArticles / this.perPage;
          checkPage = Math.round(checkPage);
          if (this.currentPage < checkPage) {
            this.currentPage++;
            this.showOverlay = true;

            if (this.posts.length < 100) {
              axios
                .get(
                  `http://newsapi.org/v2/everything?q=${this.form.searchText}&sortBy=${this.form.sortBy}&from=${this.form.fromDatePicker}&to=${this.form.tillDatePicker}&page=${this.currentPage}&apiKey=15105666e9fe426d838014145956acd4`
                )
                .then(response => {
                  console.log(response);
                  this.totalArticles = response.data.totalResults;
                  this.posts = this.posts.concat(response.data.articles);
                  this.error = null;
                })
                .catch(error => {
                  console.log(error);
                  this.error = error;
                })
                .finally(() => {
                  this.showOverlay = false;
                });
            } else {
              this.showOverlay = false;
              this.noPosts = true;
              this.developerLimit = true;
            }
          }
        }
      };
    },
    fetchData() {
      this.showOverlay = true;
      this.nullWindowsScroll();
      axios
        .get(
          `http://newsapi.org/v2/top-headlines?country=za&sortBy=popularity&apiKey=15105666e9fe426d838014145956acd4`
        )
        .then(response => {
          console.log(response);
          this.totalArticles = response.data.totalResults;
          this.posts = response.data.articles;
          this.noPosts = false;
          this.developerLimit = false;
          this.error = null;
        })
        .catch(error => {
          console.log(error);
          this.error = error;
        })
        .finally(() => {
          this.showOverlay = false;
          this.currentPage = 1;
          this.headlinesScroll();
        });
    },
    searchNews() {
      this.showOverlay = true;
      this.posts = [];
      this.noSearchResults = false;
      this.nullWindowsScroll();
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0;
      axios
        .get(
          `http://newsapi.org/v2/everything?q=${this.form.searchText}&sortBy=${this.form.sortBy}&from=${this.form.fromDatePicker}&to=${this.form.tillDatePicker}&apiKey=15105666e9fe426d838014145956acd4`
        )
        .then(response => {
          console.log(response);
          if(response.data.totalResults == 0){
            console.log("I got no posts!")
            this.noSearchResults = true;
          } else{
            this.posts = response.data.articles;
            this.noPosts = false;
          }
          this.totalArticles = response.data.totalResults;
          this.error = null;
          this.developerLimit = false;
        })
        .catch(error => {
          console.log(error);
          this.error = error;
        })
        .finally(() => {
          this.everythingScroll();
          this.currentPage = 1;
          this.showOverlay = false;
        });
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.searchNews();
    },
    onReset(evt) {
      evt.preventDefault();
      this.posts = [];
      this.form.searchText = [];
      this.form.sortBy = null;
      const newDate = new Date();
      const todayDate = new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate()
      );
      this.form.fromDatePicker = todayDate;
      this.form.tillDatePicker = todayDate;
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0;
      this.fetchData();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#sidebar-no-header {
  text-align: left;
}
</style>
