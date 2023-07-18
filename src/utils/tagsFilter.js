const whiteList = ['/login', '/import', '/404', '/401']

/**
 * path 是否需要被缓存
 * @param {*} path
 * @returns
 */
export function isNeedCreateTags (path) {
  return !whiteList.includes(path)
}
