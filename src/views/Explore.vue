<template>
  <div class="explore">
    <h1>All Discussions</h1>
    <span class="sort-text">Sort from</span>
    <select v-model="sortBy" @change="sortArray()" class="select">
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
      <option value="most_reps">Most replies</option>
    </select>
    <transition-group name="sort-list">
      <Post :data="post" v-for="post in computedList" :key="post.id"/>
    </transition-group>
  </div>
</template>

<script>
import HomePost from '@/components/Home/HomePost.vue';
import sortBy from 'lodash.sortby';
import db from "@/components/firebaseInit";
import store from '@/store/index';
export default {
  name: 'Expolore',
  components: {
    'Post': HomePost,
  },
  data(){
    return{
      posts: [],
      sortBy: '',
    }
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
      this.posts = articles;
      this.loading = false;
    });
  },
  methods: {
    sortArray(){
      if(this.sortBy == 'newest'){
        this.posts = sortBy(this.posts, (post)=> - post.create_time);
      }
      if(this.sortBy == 'oldest'){
        this.posts = sortBy(this.posts, 'create_time')
      }
      if(this.sortBy == 'most_reps'){
        this.posts = sortBy(this.posts, (post)=> - post.replies.length);
      }
      return [];
    }
  },
  computed: {
    computedList(){
      if(store.state.searchRegex == ''){
        return this.posts;
      } else{
        return this.posts.filter((item) => item.title.toLowerCase().indexOf(store.state.searchRegex.toLowerCase()) !== -1)
      }
      return [];
    }
  }
};
</script>

<style scoped lang='scss'>
.explore{
  padding: 0 10vw 50px;
}
h1{
  margin: 22px 0 10px;
}
.sort-text{
  font-size: 18px;
  margin: 0 8px 0 0;
}
.select{
  border-radius: 8px;
  padding: 5px;
  outline: none;
  font-size: 15px;
}
.sort-list-move {
  transition: all .75s;
}

.sort-list-enter-active, .sort-list-leave-active {
  transition: all .6s;
}

.sort-list-enter {
  height: 0;
  opacity: 0;
  transform: translateY(-50px);
}

.sort-list-leave-to {
  height: 0;
  opacity: 0;
  transform: translateX(50px);
}
</style>