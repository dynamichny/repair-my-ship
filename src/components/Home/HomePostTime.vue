<template>
  <span class="time">{{time}} ago</span>
</template>

<script>
export default {
  name: 'HomePostTime',
  props: {
    milisesc: Number,
  },
  computed: {
    time(){
      let timeNow = Date.now();
      let seconds_num = Math.round((timeNow - this.milisesc) / 1000);
      let hours = Math.floor(seconds_num / 3600);
      let days = Math.floor(hours / 24);
      let minutes = Math.floor((seconds_num - (hours * 3600)) / 60);
      let seconds = seconds_num - (hours * 3600) - (minutes * 60);
      return  days > 0 ? `${days} day${days != 1 ? 's': ''}` : hours > 0 ? `${hours} hour${hours != 1 ? 's': ''}` : minutes > 0 ? `${minutes} minute${minutes != 1 ? 's' : ''}` : `${seconds} secound${seconds != 1 ? 's' : ''}`;
    },
  }
};
</script>

<style scoped lang='scss'>

</style>