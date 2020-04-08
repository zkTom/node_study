
async function getP() {
    try {
        throw new Error("test reject");
        return Promise.reject("reject");
    } catch (error) {
        console.log(error.message);
    }
};
getP().then(res => {console.log("resolve",res)}).catch(err => {console.log(err)});