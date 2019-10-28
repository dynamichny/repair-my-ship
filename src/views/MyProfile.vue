<template>
  <div class="my-profile">
    <ChangePhoto />
  </div>
</template>

<script>
import store from '@/store/index';
import db from "@/components/firebaseInit";
import firebase from "firebase";
import MyProfilePhotoChange from '@/components/MyProfile/MyProfilePhotoChange.vue';

export default {
  name: 'MyProfile',
  components: {
    'ChangePhoto': MyProfilePhotoChange,
  },
  data(){
    return {
    }
  },
  computed: {
    user(){
      return store.state.user; 
    },
    displayName(){
      return user.displayName;
    },
  },
  created(){
    
    this.generateRandomId();
  },
  methods: {
  },
};
</script>

<style scoped lang='scss'>
.my-profile{
  padding: 30px 10vw;
}

</style>