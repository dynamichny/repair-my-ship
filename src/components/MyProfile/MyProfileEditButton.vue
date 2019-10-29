<template>
  <input type="submit" value="Edit" class="button-edit">
</template>

<script>
export default {
  name: 'MyProfileEditButton',
};
</script>

<style scoped lang='scss'>
.button-edit{
  display: block;
  margin: 0 auto;
  border: 2px solid black;
  color: black; 
  background: white;
  width: 200px;
  height: 60px;
  border-radius: 40px;
  font-size: 20px;
  transition: all .3s;
  font-family: 'Montserrat', 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
  cursor: pointer;
  &:hover{
    background: black;
    color: white;
  }
}
</style>