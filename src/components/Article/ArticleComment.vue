<template>
  <li class="comment">
    <div class="top">
      <span class="name">{{comment_author.displayName}}</span>
      <Time :milisesc="data.comment_time" />
    </div>
    <p class="content">{{data.comment_content}}</p>
  </li>
</template>

<script>
import store from '@/store/index';
import HomePostTime  from '@/components/Home/HomePostTime';
export default {
  name: 'ArticleComment',
  props: {
    data: Object,
  },
  components: {
    'Time': HomePostTime,
  },
  computed: {
    users(){
      return store.state.users;
    },
    comment_author(){
      let x = this.users.filter(user => user.uid == this.data.comment_author);
      return x[0];
    }
  },
};
</script>

<style scoped lang='scss'>
.comment{
  border: 1px solid rgb(173, 173, 173);
  border-radius: 5px;
  padding: 10px;
  margin: 0 0 30px;
  transition: all 0.3s;
  &:hover{
    border-color: black;
  }
}
.top{
  color: rgb(145, 145, 145);
  font-weight: 300;
  font-size: 15px;
  span{
    margin: 0 10px 0 0;
  }
}
</style>