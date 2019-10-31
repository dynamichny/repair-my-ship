<template>
  <div class="home-post" @click="goToArticle(data.id)">
    <div class="profile-photo" :style="styleObj"></div>
    <div class="content">
      <h3 class="title">{{data.title}}</h3>
      <div class="bottom">
        <span class="author">{{data.creator[0].displayName}}</span>
        <HomePostTime :milisesc="data.create_time" />
        <span class="replies">{{data.replies.length}} replies</span>
        <ul class="replies-icons">
          <RepIcon v-for="(rep, index) in commentors" :key="index" :data="rep" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import HomePostTime from './HomePostTime';
import HomePostReplieIcon from './HomePostReplieIcon.vue';
import store from '@/store/index'
export default {
  name: 'HomePost',
  components: {
    HomePostTime,
    'RepIcon': HomePostReplieIcon
  },
  props: {
    data: Object,
  },
  computed: {
    commentors(){
      let individualCommentors = [];
      this.data.replies.map((rep) => {
        if(individualCommentors.findIndex(comment => 
        comment.comment_author == rep.comment_author) < 0){
          individualCommentors.push(rep);
        }
      });
      return individualCommentors;
    },
    styleObj(){
      return {
        background: `url(${this.data.creator[0].photoURL}) center center/cover no-repeat`,
      }
    },
  },
  methods: {
      goToArticle(id) {
        this.$router.push({ path: `/article/${id}` });
      },
  }
};
</script>

<style scoped lang='scss'>
.home-post{
  margin: 10px 0 0;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all .3s;
  padding: 5px;
  border-radius: 15px;
  &:hover {
    transform: translateX(-10px);
    background: #f8f8f8;
  }
}
.profile-photo{
  border-radius: 50%;
  width: 55px;
  height: 55px;
  box-sizing: border-box;
  margin: 10px 50px 10px 0;
  @media (max-width: 500px){
    margin: 10px 5vw 10px 0;
  }
}
.title{
  margin: 6px 0;
}
.bottom{
  display: flex;
  align-items: flex-start;
  span{
    margin: 0 20px 0 0;
    color: #929292;
    font-size: 14px;
    @media (max-width: 500px){
      font-size: 10px;
    }
  }
}
.replies-icons{
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  align-items: center;
}
</style>
