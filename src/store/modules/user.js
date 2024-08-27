import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      userInfo: getInfo()// 从本地化存储中读取需要的vuex公共数据
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)// 同步修改本地化存储
    }
  },
  actions: {
    logout (context) {
      context.commit('setUserInfo', {})
      // root: true 是一个配置选项，用来指定此次 commit 是在根命名空间下进行的。
      // 通过设置 root: true，你可以从一个模块中提交根级的 mutation 或者其他模块中的 mutation，即使这些 mutation 属于不同的命名空间
      context.commit('cart/setCartList', [], { root: true })
    }
  }
}
