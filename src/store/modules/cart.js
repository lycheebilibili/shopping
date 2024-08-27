import { getCartList, changeCount, delSelect } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  getters: {
    // 购物车商品总数
    cartTotal (state) {
      console.log('getters中reduce前', state.cartList)
      return state.cartList.reduce((sum, item, index) => sum + item.goods_num, 0)
    },
    // 选中的商品列表
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的商品总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item, index) => sum + item.goods_num, 0)
    },
    // 选中的商品总价
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item, index) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },
    // 全选状态
    isAllChecked (state) {
      console.log('如果有一个item.isChecked改变则isAllChecked变', state.cartList)
      return state.cartList.every(item => item.isChecked)
    }
  },
  mutations: {
    setCartList (state, newList) {
      state.cartList = newList
      console.log('setcartList之后', state.cartList)
    },
    // 改变小选框的选择状态
    toggleCheck (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      console.log('赋值前', goods.isChecked)
      goods.isChecked = !goods.isChecked
      console.log('赋值后', goods.isChecked, state.cartList)
    },

    // 点击全选，重置选框状态
    toggleAllCheck (state, flag) {
      console.log(flag, 'mutations')
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
      console.log('item.isChecked是', state.cartList[0].isChecked)
    },
    // 更新store中的购物车商品数量
    changeCount (state, { goodsId, e }) {
      const obj = state.cartList.find(item => item.goods_id === goodsId)
      obj.goods_num = e
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },
    // 更新商品数量的action
    async changeCountAction (context, obj) {
      const { goodsId, e, skuId } = obj
      await changeCount(goodsId, e, skuId)
      context.commit('changeCount', {
        goodsId,
        e // countBox传过来的新的商品数量
      })
    },

    // 删除购物车数据
    async delSelect (context) {
      const selCartList = context.getters.selCartList
      const cartIds = selCartList.map(item => item.id)
      await delSelect(cartIds)
      Toast('删除成功')

      // 重新拉取最新的购物车数据（重新渲染）
      context.dispatch('getCartAction')
    }
  }
}
