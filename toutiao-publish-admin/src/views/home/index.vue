<template>
  <div class='home-container'>
    <h1 class="name">欢迎来到IT头条后台管理系统</h1>
    <img class="homeImg"
         src="http://toutiao-img.itheima.net/Fqn4YqWwsgHMkVMF6-clzFHBdKoT">
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  data () {
    return {

    }
  }
};
</script>

<style lang='less' scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .homeImg {
    width: 70%;
    height: 70%;
  }
  .name {
    font-size: 50px;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 0;
    margin-bottom: 0;
    text-align: center;
  }
}
</style>