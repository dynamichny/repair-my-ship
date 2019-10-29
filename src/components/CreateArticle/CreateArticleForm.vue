<template>
  <div >
    <form @submit.prevent="handleSubmit()">
      <label for="title" >Title</label>
      <input type="text" name="title" class="input input-title" minlength="3" v-model="title">
      <label for="text">Content</label>
      <textarea name="text" cols="30" rows="10" class="input input-content" v-model="content" required></textarea>
      <input type="submit" value="Create" class="btn button-submit">
    </form>
  </div>
</template>

<script>
import db from '@/components/firebaseInit';
import Article from './Article';
import store from '@/store/index';

export default {
  name: 'CreateArticleForm',
  data(){
    return{
      title: '',
      content: '',
    }
  },
  methods: {
    handleSubmit() {
      let user = store.state.user;
      let article = new Article(this.randomId, this.title, this.content, user.uid);
      db.collection('articles').doc(this.randomId).set(Object.assign({}, article))
      .then(()=> {
        this.$emit('update-state', 'over');
        setTimeout(() => {
          this.$router.push({ path: `/article/${this.randomId}`});
          }, 3000);
      })
      .catch(()=> {
        this.$emit('update-state', 'failed');
        setTimeout(() => {
          this.$emit('update-state', 'form');
          }, 3000);
      });
    },
  },
  computed: {
    randomId(){
      return '_' + Math.random().toString(36).substr(2, 9);
    },
  },
  mounted(){
    if(store.state.user == null){
      this.$router.push({ path: '/login' })
    }
  }
};
</script>

<style scoped lang='scss'>
form{
  display: flex;
  flex-direction: column;
}
label{
  font-size: 22px;
}
.input{
  border-radius: 3px;
  border: 1px solid rgb(161, 161, 161);
  font-size: 18px;
  padding: 10px;
  outline: none;
  transition: all .12s;
  &:focus{
    border-color: black;
  }
}

.input-title, .input-content{
  margin: 0 0 30px;
}

.button-submit{
  color: #5944fd;
  background: white;
  padding: 9px 20px;
  border-radius: 35px;
  font-size: 14px;
  cursor: pointer;
  transition: all .3s;
  border: 2px solid #5944fd;
  width: 250px;
  margin: 0 auto;
  &:hover{
    color: white;
    background: #5944fd;
  }
}
</style>