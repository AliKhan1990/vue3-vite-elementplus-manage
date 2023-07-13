const baseURL = import.meta.env.VITE_BASE_URL

console.log('%c当前环境为：' + import.meta.env.MODE + '/' + JSON.stringify(import.meta.env), 'color:#fff; background: linear-gradient(270deg, #986fee, #8695e6, #68b7dd, #18d7d3); padding: 8px 15px; border-radius: 0 15px 0 15px')

export default baseURL
