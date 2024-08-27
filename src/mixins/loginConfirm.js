export default {
  methods: {
    loginConfirm () {
      // 判断用户是否有登录，是否需要弹登录确认框
      // (1) 需要，返回 true，并直接弹出登录确认框
      // (2) 不需要，返回 false
      if (!this.$store.getters.token) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '请登录账号再继续操作',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            this.$router.replace({
              // 如果希望，跳转到登录 => 登录后能回跳回来，需要在跳转去携带参数 (当前的路径地址)
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => { })
        return true
      }
      return false
    }
  }
}
