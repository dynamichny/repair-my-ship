<template>
  <li class='replie-icon' >
    <img :src="photoURL">
  </li>
</template>

<script>
import store from '@/store/index'
export default {
  name: 'HomePostReplieIcon',
  props: {
    data: Object,
  },
  computed: {
    photoURL(){
      let user = store.state.users.filter(user => user.uid == this.data.comment_author);
      return user[0].photoURL;
    }
  }
};
</script>

<style scoped lang='scss'>
.replie-icon{
    margin: 0 0 0 -10px;
    border: 4px solid white;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    img{
      border-radius: 50%;
      width: 25px;
    }
  }
</style>