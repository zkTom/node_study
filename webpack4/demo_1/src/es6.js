// import "core-js/stable";
// import "regenerator-runtime/runtime";

// const set = new Set([1,2,2,3]);
new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
        resolve();
    } else {
        reject();
    }
}).then(() => {
    console.log('suc')
}).catch(() => {
    console.log('err')
})
new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
        resolve();
    } else {
        reject();
    }
}).then(() => {
    console.log('suc')
}).catch(() => {
    console.log('err')
})
// const a = 1;