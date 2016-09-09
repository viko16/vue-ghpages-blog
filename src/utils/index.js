/**
 * Reduce your object
 *
 * @param {object} obj
 * @param {array} scopeArr
 * @returns a reduced object
 */
export function objReduce (obj, scopeArr) {
  return Object.keys(obj)
    .filter(el => scopeArr.indexOf(el) !== -1)
    .reduce((res, key) => {
      res[key] = obj[key]
      return res
    }, {})
}
