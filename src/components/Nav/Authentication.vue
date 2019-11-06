<template>
  <div class="right" >
    <div v-if="isLogged" class="right myprofile" @click="isModal = !isModal">
        <span :style="styleObj" class="profile-photo"></span>
        <span>My Profile</span>
        <span><img src="@/assets/arrow.svg" class="arrow" :class="{flipped: isModal}"></span>
      </div>

      <div v-if="!isLogged">
        <router-link to="/login" >Login</router-link>
        <router-link to="/register">Register</router-link>
      </div>
      
      <transition name='show'>
      <ul v-if="isLogged && isModal" class="logoutModal">
        <li @click="isModal = false"><router-link to ="/my-profile" >{{user.displayName}}</router-link></li>
        <li class="logout" @click="handleLogout()">Logout</li>
      </ul>
      </transition>
  </div>
</template>

<script>
import store from '@/store/index';
import firebase from "firebase";
export default {
  name: 'Authentication',
  data(){
    return{
      isModal: false,
    }
  },
  computed: {
    isLogged(){
      return store.state.isLogged;
    },
    user(){
      return store.state.user;
    },
    styleObj(){
      return {
        background: `url(${this.user.photoURL}) center center/cover no-repeat`,
      }
    }
  },
  methods: {
    handleLogout(){
      firebase.auth().signOut()
      .then(()=>{
        store.commit('setUser', { user: null, isL: false })
        this.$router.push({ path: '/' })
      });
    },
  },
};
</script>

<style scoped lang='scss'>
.right{
  height: 100%;
  margin-left: auto;
  display: flex;
  align-items: center;
  @media (max-width: 800px){
    margin: 5px auto;
  }
}
.myprofile{
  cursor: pointer;
}
.profile-photo{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 0 10px;
}
.arrow{
  width: 20px;
  margin: 0 0 0 7px;
  transition: all .3s .15s;
}
.flipped{
  transform: rotate(180deg)
}
.logoutModal{
  z-index: 0;
  position: absolute;
  top: 100%;
  text-align: right;
  right: 10vw;
  background: #f8f8f8;
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 400px;
  overflow: hidden;
  li{
    border-bottom: 1px solid rgb(207, 207, 207); 
    margin: 10px 0px 0;
    padding: 10px;
    font-size: 17px;
    cursor: pointer;
  }
}
.logout{
  color: red;
  text-align: center;
  font-weight: bold;

}
.show-enter, .show-leave-to{
  max-height: 0;

} 

.show-enter-active, .show-leave-active{
  transition: max-height .5s ease-in-out;
}

</style>