<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/explore">Explore</router-link>
      
      <input type="text" placeholder="Search" v-model="searchInput" class="search-input">

      <router-link to="/my-profile" v-if="isLogged" class="right">
        <img :src="user.photoURL" class="profile-photo">
        <span>My Profile</span>
      </router-link>

      <div class="right" v-if="!isLogged">
        <router-link to="/login" >Login</router-link>
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
  width: 100vw;
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Montserrat', 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
}

#nav {
  padding: 15px 10vw;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background: #f8f8f8;
  font-size: 20px;
  justify-content: center;
  @media (max-width: 900px){
    }

  a {
    font-weight: bold;
    margin: 5px 20px;
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
    @media (max-width: 800px){
      margin: 5px auto;
    }
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

button{
  font-family: 'Montserrat', 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
