import dayjs from 'dayjs'
import store from '@/store'

const language = store.getters.language
export const dateFilter = (val, type) => {
  let format = ''
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  // 类型处理
  if (!type) {
    format = language === 'zh' ? 'YYYY年MM月DD日' : 'YYYY-MM-DD'
  } else if (Object.keys(type).length > 1) {
    const { year, month, day } = type
    format = `YYYY${year}MM${month}DD${day}`
  } else {
    format = `YYYY${type}MM${type}DD${type}`
  }

  return dayjs(val).format(format)
}

export default app => {
  app.config.globalProperties.$filters = {
    dateFilter
  }
}
