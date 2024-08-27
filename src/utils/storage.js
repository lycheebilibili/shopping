const INFO_KEY = 'hm_shopping_info' // 个人信息
const HISTORY_KEY = 'hm_history_list' // 搜索记录

// 获取个人信息
export const getInfo = () => {
  const result = localStorage.getItem(INFO_KEY)
  const finalResult = result
    ? JSON.parse(result)
    : {
        token: '',
        userId: ''
      }
  return finalResult
}

// 设置个人信息
export const setInfo = (info) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(info))
}

// 移除个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 获取历史记录
export const getHistoryList = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result
    ? JSON.parse(result)
    : []
}

// 设置历史记录
export const setHistoryList = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
