<template>
  <div>
   <router-view/>
    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item icon="home-o" to = '/home'>首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to = '/category'>分类页</van-tabbar-item>
      <van-tabbar-item icon="cart-circle-o" to = '/cart'>购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to = '/user'>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'IndexVue',
  data () {
    return {
      active: 0
    }
  }
}
</script>
