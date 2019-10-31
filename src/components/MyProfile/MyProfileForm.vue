<template>
  <div class="myprofile-form">
    <form @submit.prevent="handleSave()">
      <label for="displayName" class="label">Display name: </label>
      <div class="name">
        <div class="trans-group">
          <transition name="show">
            <span v-if="!edit" class="name-text">{{this.user.displayName}}</span>
          </transition>
          <transition name="show">
            <input type="text" name="displayName" v-model="displayName" v-if="edit">
          </transition>
        </div>
      </div>
      <p class="label">Email:</p>
      <p>{{user.email}}</p>
      <input type="submit" value="Save" class="button" v-if="edit">
    </form>
  </div>
</template>

<script>
import store from '@/store/index';
import db from "@/components/firebaseInit";
import firebase from "firebase";

export default {
  name: 'MyProfileFo',
  data(){
    return{
      displayName: '',
    }
  },
  computed: {
    user(){
      return store.state.user;
    },
    edit(){
      return store.state.edit;
    },
  },
  mounted(){
    this.displayName = this.user.displayName;
  },
  methods: {
    handleSave(){
      if(this.displayName.length > 0 && this.displayName != this.user.displayName){
        let user = this.user;
        user.displayName = this.displayName;
        db.collection('users').doc(this.user.uid).update(user);
        store.commit('edit');
      } else{
        store.commit('edit');
      }
    },
  },

};
</script>

<style scoped lang='scss'>
.myprofile-form{
  margin: 20px 0;
  form{
    transition: all .3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
    box-sizing: border-box;
  }
}
.label{
  font-weight: bold;
}
.button{
  border: 2px solid #1ecd97;
  color: #1ecd97; 
  background: white;
  width: 200px;
  height: 60px;
  border-radius: 40px;
  font-size: 20px;
  margin: auto;
  transition: all .3s;
  font-family: 'Montserrat', 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
  cursor: pointer;
  margin: 20px auto;
  &:hover{
    background: #1ecd97;
    color: white;
  }
}

p{
  margin: 0;
  
}
.label{
  margin: 10px;
}
.name-text{
  height: 37px;
}

input[name="displayName"]{
  padding: 10px;
  border: 1px solid rgb(167, 167, 167);
  border-radius: 12px;
  margin: 0 7px;
}
.trans-group{
  display: flex;
  flex-direction: column;
}
.show-enter{
  transform: translateY(20px);
  opacity: 0;
  position: absolute;
} 
.show-leave-to {
  transform: translateY(-20px);
  opacity: 0;
  position: absolute;
}
.show-enter-active, .show-leave-active{
  transition: all .3s;
}
</style>