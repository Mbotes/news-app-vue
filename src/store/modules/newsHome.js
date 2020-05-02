import Axios from 'axios'

const state = {
    posts: [],
    heroPosts: [],
    currentPage:1,
    errors: null
};

const getters = {
    HEROPOSTS : state => {
        return state.heroPosts;
    }
};

const mutations = {
    SET_HERO_POSTS : (state,payload) => {
      console.table(payload)
        state.heroPosts = payload
    },
};

const actions = {
  _GET_HERO_POSTS: async (context) => {
    let { data } = await Axios.get('top-headlines?country=us&sortBy=popularity&page=1')
    console.log(data);
    if(data.status == "ok") {
      context.commit('SET_HERO_POSTS', data.articles.slice(0, 5));

    }else {
      this.errors = true;
    }
  },
  _GET_NEWS_POSTS: async (context) => {
    let { data } = await Axios.get(`top-headlines?country=za&sortBy=popularity&page=${this.currentPage}`)
    if(data.success)
    context.commit('SET_TODO', data.articles);
  }
};

export default {
  state,getters,mutations,actions
}