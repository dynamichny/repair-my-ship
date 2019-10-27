<template>
  <div class="login">
    <form @submit.prevent="handleLogin()">
      <input type="email" placeholder="Login" v-model="login" required class="input">
      <input type="password" placeholder="Password" v-model="password" required min="6" class="input">
      <button type="submit" class="submit">
        <img src="@/assets/loading_white.svg" v-if="loading">
        <p v-else >Login</p>
      </button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/components/firebaseInit";
import store from '@/store/index';
export default {
  name: 'Login',
  data(){
    return{
      login: '',
      password: '',
      loading: false,
    }
  },
  methods: {
    handleLogin(){
      this.loading = true;
      firebase.auth().signInWithEmailAndPassword( this.login, this.password )
        .then((result) => {
          let res = firebase.auth().currentUser;
          this.loading = false;
          db.collection('users').doc(res.uid).onSnapshot((res) => {
            store.commit('setUser', res.data());
          });
          this.$router.push({ path: '/' });
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped lang='scss'>
.login{
  margin: 20px auto;
  width: 80vw;
  padding: 10vh;
  background: #e9e9e9;
}
form{
  display: flex;
  flex-direction: column;
}
.input{
  padding: 10px;
  max-width: 1000px;
  width: 100%;
  background: none;
  border: none;
  border-bottom: 2px solid black;
  margin: 0 auto 40px;
  box-sizing: border-box;
  transition: all .2s;
  outline: none;
  &:focus{
    border-bottom: 4px solid black;
  }
}
.submit{
  width: 50%;
  background: black;
  color: white;
  padding: 10px;
  border: none;
  margin: auto;
  cursor: pointer;
  box-sizing: border-box;
  img{
      height: 45px;
  }
}
</style>