export const indexLoop = (index, array) => {
  let vars = array.length - 1
  if (index < 0) return vars
  if (index > vars) return 0
  return index
}
