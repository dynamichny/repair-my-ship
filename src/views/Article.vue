<template>
  <div class="article">
    <h1>{{post.title}}</h1>
    <div class="info">
      <span class="author">
        <img :src="photoURL" class="author-photo">
        by {{authorName}}
      </span>
      <Time :milisesc="post.create_time" />
    </div>
    <p class="content">
      {{post.content}}
    </p>
    <ArticleCommentBox :articleID="post.id" />
    <h2>Comment section</h2>
    <transition-group tag="ul" name="slide">
      <ArticleComment v-for="(comment, index) in post.replies" :key="index" :data="comment"/>
    </transition-group>
  </div>
</template>

<script>
import db from "@/components/firebaseInit";
import store from '@/store/index';
import HomePostTime from '@/components/Home/HomePostTime.vue';
import ArticleCommentBox from '@/components/Article/ArticleCommentBox.vue';
import ArticleComment from '@/components/Article/ArticleComment.vue';

export default {
  name: 'Article',
  components: {
    'Time': HomePostTime,
    ArticleCommentBox,
    ArticleComment,
  },
  computed: {
    postId() {
      return this.$route.params.id;
    },
    author(){
      let author = this.users.filter(user => this.post.author_id == user.uid)
      return author[0];
    },
    authorName(){
      return this.author ? this.author.displayName : '';
    },
    photoURL(){
      return this.author ? this.author.photoURL : '';
    }
  },
  data(){
    return {
      post: '',
      users: [],
    }
  },
  created(){
    db.collection('articles').doc(this.postId).onSnapshot((res) => {
      if(!res.exists){
        this.$router.push({ path: '/notfound' })
      }
      this.post = res.data();
    })
  
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
  },
  
};
</script>

<style scoped lang='scss'>
.article{
  padding: 0 10vw;
}
h1{
  margin: 25px 0 5px;
}
h2{
  color: rgb(167, 167, 167);
}
.info{
  display: flex;
  color: rgb(156, 156, 156);
  align-items: flex-end;
  flex-wrap: wrap;
}
.author{
  display: flex;
  align-items: flex-end;
  margin: 0 10px 0 0;
  .author-photo{
    margin: 0 7px 0 0;
    width: 30px;
    border-radius: 50%;
  }
}
.content{
  margin: 40px 0 0 0;
  white-space: pre-line;
  overflow-wrap: break-word;
}
ul{
  list-style: none;
  padding: 0;
  margin: 0;
}
.slide-enter, .slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.slide-enter-active, .slide-leave-active{
  transition: opacity 0.3s linear, transform 0.3s ease-in-out;
}
</style>
