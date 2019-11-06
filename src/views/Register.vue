<template>
  <div class="register">
    <form @submit.prevent="handleRegister()">
      <input type="email" placeholder="Login" v-model="login" required class="input">
      <input type="password" placeholder="Password" v-model="password" required min="6" class="input">
      <input type="password" placeholder="Confirm Password" v-model="confirmPassword" required min="6" class="input">
      <button type="submit" class="submit">
        <img src="@/assets/loading_white.svg" v-if="loading">
        <p v-else >Register</p>
      </button>
    </form>
    <div v-if="success == true" class="alert success">✔ Success</div>
    <div v-if="success == false" class="alert failed">❌ Failed</div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/components/firebaseInit";
import store from '@/store/index';
import User from '@/components/NewUser';
export default {
  name: 'Register',
  data(){
    return{
      login: '',
      password: '',
      confirmPassword: '',
      success: null,
      loading: false,
    }
  },
  computed:{
    confirmed(){
      return this.password == this.confirmPassword ? true : false;
    },
  },
  methods: {
    handleRegister(){
      if(this.confirmed){
        this.loading = true;
        firebase.auth().createUserWithEmailAndPassword( this.login, this.password )
          .then(()=> {
            this.success = true;
            this.loading = false;
            firebase.auth().signInWithEmailAndPassword( this.login, this.password )
            .then((result) => {
              let res = firebase.auth().currentUser;
              this.loading = false;
              let user = new User(res.email, res.displayName, res.photoURL, res.uid)
              db.collection('users').doc(res.uid).set(Object.assign({}, user));
              db.collection('users').doc(res.uid).onSnapshot((res) => {
                store.commit('setUser', {user: res.data(), isL: true });
              });
              this.$router.push({ path: '/' });
            })
          })
          .catch(()=> {
            this.success = false;
            this.loading = false;
          })
      } else {
        alert('Passwords are not the same.')
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.register{
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
  outline: none;
  transition: all .2s;
  &:focus{
    border-bottom: 4px solid black;
  }
}
.submit{
  width: 50%;
  height: 60px;
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