define(['moduleB'],(moduleB) => {
  setTimeout(() => {console.log('from module A:',moduleB)},1000)
})