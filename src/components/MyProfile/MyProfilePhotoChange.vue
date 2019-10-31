<template>
  <div class="profile_photo">
    <div class="photo" :style="styleObj"></div>
    <transition name="show">
      <form @submit.prevent="handlePhotoUpload()" v-if="edit">
        <label >
          <img src="@/assets/upload.svg" alt="" style="width: 25px">
          <p>Select Photo</p>
          <input type="file" accept="image/*" ref="file" @change="isFile = true">
        </label>
        <button type="submit" :disabled="!isFile">
          <p v-if="!uploading">Upload photo</p>
          <img src="@/assets/loading_black.svg" alt="Loadinig..." v-else style="height:40px; margin: 0;">
        </button>
      </form>
    </transition>
  </div>
</template>

<script>
import store from '@/store/index';
import db from "@/components/firebaseInit";
import firebase from "firebase";

export default {
  name: 'MyProfilePhotoChange',
  data(){
    return {
      uploading: false,
      randomId: '',
      isFile: false,
    }
  },
  computed: {
    user(){
      return store.state.user; 
    },
    edit(){
      return store.state.edit;
    },
    styleObj(){
      return {
        background: `url(${this.user.photoURL}) center center/cover no-repeat`,
      }
    },
  },
  
  mounted(){
    if(store.state.isLogged == false){
      this.$router.push({ name: 'Login' });  
    }
    this.generateRandomId();
  },
  methods: {
    handlePhotoUpload(){
      const storage = firebase.storage();
      const file = this.$refs.file.files[0];
      this.generateRandomId();
      const fileName = this.user.uid + this.randomId;
      const storageRef = storage.ref(`profilePhotos/${fileName}`);
      const task = storageRef.put(file);
      task.on('state_changed', (snapshot) => {
        this.uploading = true;
      }, (err) => {
        this.uploading = false;
        alert('Uploading faiiled.')
      }, ()=>{
        this.uploading = false;
        this.user.photoURL = `https://firebasestorage.googleapis.com/v0/b/repairmyship-896ee.appspot.com/o/profilePhotos%2F${fileName}?alt=media`;
        db.collection('users').doc(this.user.uid).update(Object.assign({}, this.user))
        .then(()=>{
          store.commit('updateUser', this.user);
        })
      });
    },
    generateRandomId(){
      this.randomId = '_' + Math.random().toString(36).substr(2, 9);
    }
  },
};
</script>

<style scoped lang='scss'>
.profile_photo{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all .3s;
  .photo{
    margin: 0 0 30px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 1px solid black;
                      
  }
  input{
    display: none;
    
  }
  label{
    width: 200px;
    height: 50px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 6px 12px;
    border-radius: 8px;
    cursor: pointer; 
    img{
      margin: 0 7px 0 0;
    }
    p{
      margin: 0;
    }
  }
  button{
    box-sizing: border-box;
    width: 200px;
    height: 50px;
    margin: 15px auto 0;
    border: none;
    border-radius: 8px;
    background: black;
    transition: all .3s;
    color: white;
    cursor: pointer;
    font-size: 16px;
    &:disabled{
      background: gray;
      cursor: default;

    }
  }
}
form{
  max-height: 300px;
}
.show-enter{
  transform: translateY(-50px);
  opacity: 0;
  max-height: 0
} 
.show-leave-to {
  transform: translateY(-50px);
  opacity: 0;
  max-height: 0
  
}
.show-enter-active, .show-leave-active{
  transition: all .5s;
}
</style>