
<template>
  <div styling="min-height:400px;" class="container">
    <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" backdrop shadow>
      <template v-slot:default="{ hide }">
        <b-overlay :show="showOverlay" >  
          <div class="p-3" style="text-align:left;">

              <h4 id="sidebar-no-header-title">Filter News</h4>
              <b-form @submit="onSubmit" @reset="onReset">
                <b-form-group
                  id="input-group-1"
                  label="Search:"
                  label-for="tags-basic"
                  description="Keywords: Trump, Oil prices, Disney etc."
                >
                  <b-form-input
                    input-id="tags-basic"
                    remove-on-delete
                    v-model="form.searchText"
                    class="mb-2"
                    placeholder="Keyword search"
                    required
                  ></b-form-input>
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
                    :value-as-date="true"
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
                    :value-as-date="true"
                  ></b-form-datepicker>
                </b-form-group>

                <b-form-group id="input-group-3" label="Filter by:" label-for="input-3" description="relevancy = articles more closely related to search terms come first,
    popularity = articles from popular sources and publishers come first,
    date = latest articles come first.">
                  <b-form-select id="input-3" v-model="form.sortBy" :options="sortByFields" required  ></b-form-select>

                </b-form-group>

                <b-form-group id="input-group-4" label="Language:" label-for="input-4" >
                  <b-form-select id="input-4" v-model="form.language" :options="languageFields" required  ></b-form-select>

                </b-form-group>

                <b-button type="submit" variant="outline-primary" block>Search</b-button>
                <b-button type="reset" variant="outline-danger" block @click="hide()">Reset</b-button>
                <b-button variant="outline-warning" block @click="hide()">Close</b-button>
              </b-form>
          </div>
        </b-overlay>
      </template>
    </b-sidebar>
    <HeroCarousel :heroPosts="this.heroPosts" />
    <div class="post">
      <div>
        <b-jumbotron header="News Agent" lead="The Bleeding Edge News Network!"></b-jumbotron>
      </div>
    </div>
    <div v-if="posts">
      <div>
        <Posts
          :posts="this.posts"
          :showOverlay="this.showOverlay"
          :error="this.error"
          :noPosts="this.noPosts"
          :noSearchResults="this.noSearchResults"
          :developerLimit="this.developerLimit"
          :SearchFields="this.form"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Posts from "@/components/Posts.vue";
import HeroCarousel from "@/components/HeroCarousel.vue";
import moment from 'moment';
export default {
  data() {
    const today =  moment().format("YYYY-MM-DD");
    const maxDate = moment().format("YYYY-MM-DD");
    const minDate = moment().subtract(1, 'month').format("YYYY-MM-DD");
    return {
      posts: [],
      error: null,
      showOverlay: true,
      dateMax: maxDate,
      dateMin: minDate,
      currentPage: 1,
      hide: true,
      perPage: 20,
      totalArticles: 0,
      noSearchResults: false,
      noPosts: false,
      developerLimit: false,
      form: {
        searchText: null,
        fromDatePicker: today,
        tillDatePicker: today,
        sortBy: 'relevancy',
        checked: [],
        language: 'en'
      },
      sortByFields: [
        { text: "Relevancy", value: "relevancy" },
        { text: "Popularity", value: "popularity" },
        { text: "Date", value: "publishedAt" }
      ],
      languageFields:[
         { text: "EN", value: "en" },
        { text: "FR", value: "fr" },
        { text: "DE", value: "de" },
        { text: "ES", value: "es"},
        { text: "AR", value: "ar"},
        { text: "HE", value: "he"},
        { text: "IT", value: "it"},
        { text: "NL", value: "nl"},
        { text: "NO", value: "no"},
        { text: "PT", value: "pt"},
        { text: "RU", value: "ru"},
        { text: "SE", value: "se"},
        { text: "UD", value: "ud"},
        { text: "ZH", value: "zh"},

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
                `top-headlines?country=za&sortBy=popularity&page=${this.currentPage}`
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
                  `everything?q=${this.form.searchText}&sortBy=${this.form.sortBy}&from=${this.form.fromDatePicker}&to=${this.form.tillDatePicker}&page=${this.currentPage}&language=${this.form.language}`
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
          `top-headlines?country=za&sortBy=popularity`
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
      document.body.scrollTop = 100; // For Safari
      document.documentElement.scrollTop = 100;
      axios
        .get(
          `everything?q=${this.form.searchText}&sortBy=${this.form.sortBy}&from=${this.form.fromDatePicker}&to=${this.form.tillDatePicker}&language=${this.form.language}`
        )
        .then(response => {
          console.log(response);
          if(response.data.totalResults == 0){
            this.noSearchResults = true;
          } else{
            this.posts = response.data.articles;
            this.noPosts = false;
          }
          this.hide = true;
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
      this.form.fromDatePicker = moment(this.form.fromDatePicker).format("YYYY-MM-DD")
      this.form.tillDatePicker = moment(this.form.tillDatePicker).format("YYYY-MM-DD")
      if(this.form.fromDatePicker <= this.form.tillDatePicker ) {
        
        this.searchNews();

      } else {
        alert("please make sure your till date is greater than your from date!");
      }
    },
    onReset(evt) {
      evt.preventDefault();
      this.posts = [];
      this.form.searchText = null;
      this.form.sortBy = 'relevancy';
      const today = moment().format("YYYY-MM-DD")
      this.form.fromDatePicker = today;
      this.form.tillDatePicker = today;
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
