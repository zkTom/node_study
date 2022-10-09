export default (a,b)=>{
  return a+b;
}
export function addMore(...rest) {
  // inital value is 0
  return rest.reduce((pre, cur, curIdx, arr) => {
    return pre + cur;
  },0)
}