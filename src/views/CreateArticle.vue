<template>
  <div class="create-article">
    <transition name="slide" mode="out-in">
      <CreateArticleForm v-if="state == 'form'" @update-state="state = $event"/>
      <CreateArticleOver v-if="state == 'over'" />
      <CreateArticleFailed v-if="state == 'failed'" />
    </transition>
  </div>
</template>

<script>
import CreateArticleForm from '@/components/CreateArticle/CreateArticleForm.vue';
import CreateArticleOver from '@/components/CreateArticle/CreateArticleOver.vue';
import CreateArticleFailed from '@/components/CreateArticle/CreateArticleFailed.vue';

export default {
  name: 'CreateArticle',
  components: {
    CreateArticleForm,
    CreateArticleOver,
    CreateArticleFailed
  },
  data(){
    return {
      state: 'form'
    }
  },
};
</script>

<style scoped lang='scss'>
.create-article{
  padding: 10vh 10vw;
}
.slide-enter, .slide-leave-to {
  opacity: 0;
}
.slide-enter-active, .slide-leave-active{
  transition: opacity 0.2s linear, transform 0.5s ease-in-out;
}

</style>
