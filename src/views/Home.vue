<template>
  <div class="home">
    <transition name="slide">
      <HomeHeader />
    </transition>
    <HomeArticles />
  </div>
</template>

<script>
import HomeHeader from '@/components/Home/HomeHeader.vue';
import HomeArticles from '@/components/Home/HomeArticles.vue';
import db from "@/components/firebaseInit";
import store from '@/store/index';

export default {
  name: 'home',
  components: {
    HomeHeader,
    HomeArticles,
  },
  created(){
    db.collection('users').get()
    .then((res)=>{
      let users = res.docs.map(user => user.data())
      store.commit('setUsers', users);
    })
  },
};
</script>

<style lang="scss" scoped>
.home{
  width: 100%;;
  height: auto;
}
.slide-enter, .slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.slide-enter-active, .slide-leave-active{
  transition: opacity 0.5s linear, transform 0.5s ease-in-out;
}
</style>
