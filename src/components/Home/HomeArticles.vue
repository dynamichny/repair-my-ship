<template>
  <div class="home-articles">
    <div class="head">
      <h2>Newest Discussions</h2>
      <div class="create-new-post" @click="goToCreate()">Create New Post</div>
    </div>
    <router-link class="view-all" to="/explore">View all {{postsCounter}} discussions</router-link>
    <ul>
      <transition-group name="slide">
        <li v-for="post in posts" :key="post.id">
          <home-post :data="post" />
        </li>
      </transition-group>
      <img src="@/assets/loading_black.svg" class="articles-loading" v-if="loading">
    </ul>
  </div>
</template>

<script>
import HomePost from './HomePost.vue';
import db from "@/components/firebaseInit";
import store from '@/store/index';
import sortBy from 'lodash.sortby';

export default {
  name: 'HomeArticles',
  components: {
    HomePost,
  },
  data() {
    return {
      posts: [],
      users: [],
      postsCounter: 0,
      loading: true,
    };
  },
  methods: {
    goToCreate() {
      this.$router.push({ path: '/create' });
    },
  },
  created(){
    if(store.state.users){
      this.users = store.state.users;
    } else {
      db.collection('users').get()
      .then(res => {
        let users = [];
        for(const i in res.docs){
          users.push(res.docs[i].data())
        }
        this.users = users;
        store.commit('setUsers', users);
      });
    }

    db.collection('articles').onSnapshot(res => {
      let articles = [];
      for(const i in res.docs){
        let article = res.docs[i].data();
        let users = this.users;
        article.creator = users.filter(user => user.uid === article.author_id);
        articles.push(article)
      }
      this.postsCounter = articles.length;
      let newestPosts = sortBy(articles, (post)=> - post.create_time)
      this.posts = newestPosts.slice(0,5);
      this.loading = false;
    });
      
  }
};
</script>

<style scoped lang='scss'>
.home-articles{
padding: 10px 10vw;
}
.head{
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2{
    margin: 0;
  }
}
.create-new-post{
  color: white;
  background: #5944fd;
  padding: 9px 20px;
  border-radius: 35px;
  font-size: 14px;
  cursor: pointer;
  transition: all .3s;
  border: 2px solid #5944fd;
  &:hover{
    background: white;
    color: #5944fd;
  }
}
.view-all{
  color: rgba(0, 0, 0, .4);
  font-weight: 400;
  text-decoration: none;
}
ul{
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
}
.articles-loading{
  position: absolute;
  top: 5px;
  left: 0;
  right: 0;
  width: 100px;
  margin: auto;
}
.slide-enter, .slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.slide-enter-active, .slide-leave-active{
  transition: opacity 0.5s linear, transform 0.5s ease-in-out;
}

</style>
