<template>
  <div id="app">
    <div id="nav">
      <img src="@/assets/logo.png" alt="Logo" style="width: 50px">
      <router-link to="/">Home</router-link>
      <router-link to="/explore">Explore</router-link>
      <router-link to="/my-profile" v-if="isLogged" class="right">
        <img :src="user.photoURL" class="profile-photo">
        <span>My Profile</span>
      </router-link>
      <input type="text" placeholder="Search" v-model="searchInput" class="search-input">
      <div v-if="!isLogged" class="right">
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </div>
    </div>

    <transition  name="view-change" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import store from '@/store/index';
export default {
  name: 'App',
  computed: {
    isLogged(){
      return store.state.isLogged;
    },
    user(){
      return store.state.user;
    }
  },
  data(){
    return{
      searchInput: '',
    }
  },
  watch: {
    searchInput(){
      store.commit('setSearchRegex', this.searchInput);
      if(this.$router.currentRoute.fullPath != "/explore"){
        this.$router.push({ path: '/explore' });
      }
    },
  }
}
</script>

<style lang="scss">
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
}

#nav {
  padding: 15px 10vw;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background: #f8f8f8;
  font-size: 20px;

  a {
    font-weight: bold;
    margin: 0 0 0 40px;
    text-decoration: none;
    font-weight: 400;
    color: black;

    &.router-link-exact-active {
      font-weight: 900;
      text-decoration: none;
    }
  }
  .right{
    margin-left: auto;
    display: flex;
    align-items: center;
  }
  .profile-photo{
    width: 30px;
    border-radius: 50%;
    margin: 0 10px;
  }
}

.search-input{
  padding: 8px;
  border: 1px solid rgb(184, 184, 184);
  border-radius: 15px;
  margin: 0 15px;
  outline: none;
  transition: all 0.2s;
  &:focus{
    border-color: rgb(99, 99, 99); 
  }
}

.view-change-enter, .view-change-leave-to {
  transform: translateX(-200px);
  opacity: 0;
}

.view-change-enter-active, .view-change-leave-active{
  transition: opacity 0.25s linear, transform 0.25s cubic-bezier(0.25, 0.85, .98, 1);
}
</style>
