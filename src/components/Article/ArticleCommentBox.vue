<template>
  <div class="comment-box">
    <form @submit.prevent="handleComment()">
      <textarea v-model="comment" placeholder="Comment box" :disabled="commentDisabled"></textarea>
      <input type="submit" :disabled="commentDisabled" :value="buttonText" >
    </form>
  </div>
</template>

<script>
import store from '@/store/index';
import db from "@/components/firebaseInit";
export default {
  name: 'ArticleCommentBox',
  props: {
    articleID: String,
  },
  data(){
    return{
      comment: '',
    }
  },
  computed: {
    buttonText(){
      return store.state.user != null ? 'Submit comment' : 'Login to comment';
    },
    commentDisabled(){
      return store.state.user == null ? true : false;
    }
  },
  methods: {
    handleComment(){
      if(this.comment.length > 0){
        db.collection('articles').doc(this.articleID).get()
        .then((res) => {
          let article = res.data();
          let time = Date.now();
          article.replies.push({
            comment_author: store.state.user.uid,
            comment_content: this.comment,
            comment_time: time,
          });
          db.collection('articles').doc(this.articleID).update(article);
          this.comment = '';
        });
      }
    }
  },
};
</script>

<style scoped lang='scss'>
.comment-box{
  margin: 70px 0 100px;
}
form{
  display: flex;
  flex-direction: column;
}
textarea{
  outline: none; 
  user-select: text; 
  white-space: pre-wrap; 
  overflow-wrap: break-word;
  width: 100%;
  min-height: 100px;
  margin: auto;
  font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
  resize: none;
  border-radius: 5px;
  &:focus{
    border-color: black;
  }
}
input{
  margin: 10px 0 0;
  color: white;
  background: black;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  &:disabled{
    background: gray;
    cursor: default;
  }
}
</style>