<template>
  <div class="my-profile">
    <ChangePhoto />
    <MyProfileForm />
    <EditButton @click.native="updateEdit()" v-if="!edit" />
  </div>
</template>

<script>
import store from '@/store/index';
import db from "@/components/firebaseInit";
import firebase from "firebase";
import MyProfilePhotoChange from '@/components/MyProfile/MyProfilePhotoChange.vue';
import MyProfileForm from '@/components/MyProfile/MyProfileForm.vue';
import MyProfileEditButton from '@/components/MyProfile/MyProfileEditButton.vue';

export default {
  name: 'MyProfile',
  components: {
    'ChangePhoto': MyProfilePhotoChange,
    MyProfileForm,
    'EditButton':MyProfileEditButton,
  },
  computed: {
    user(){
      return store.state.user; 
    },
    displayName(){
      return user.displayName;
    },
    edit(){
      return store.state.edit;
    }
  },
  methods: {
    updateEdit(){
      store.commit('edit');
    }
  },
};
</script>

<style scoped lang='scss'>
.my-profile{
  padding: 30px 10vw;
}

</style>