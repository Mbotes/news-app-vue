<template>
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
                <a :href="post.url" target="_blank">{{ post.title }}</a>
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
</template>
<script>
import moment from 'moment';
export default {
    name: 'Posts',
    props: {
        msg: String,
        posts: Array,
        showOverlay: Boolean,
        error: String
    },
    filters: {
        dateFilter(item){
            if (!item) return ''
            return moment(item).format('Do MMMM YYYY');
        }
    }     
}
</script>