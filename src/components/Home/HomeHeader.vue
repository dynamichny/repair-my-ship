<template>
  <div class="home-header">
    <p>Forum for people with relationship issues.
      Feel free to ask for help or give it to someone who need it.</p>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
};
</script>

<style scoped lang='scss'>
.home-header{
  margin: auto;
  text-align: center;
  font-weight: 300;
  font-size: 40px;
  padding: 50px 10vw;
  @media (max-width: 480px){
    font-size: 30px;
  }
}
</style>
