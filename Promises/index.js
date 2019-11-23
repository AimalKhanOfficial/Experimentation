const returnPromise = (flag) => {
    return new Promise(function(resolve, reject) {
        flag ? resolve('your promise was resolved..') : resolve('ermm.. rejected.') 
    });
}

const someOtherFunction = (res, secondParam) => {
    console.log(`someOtherFunction::${res}, secondParam::${secondParam}`);
}

returnPromise(true)
.then(res => {
    console.log(res);
    return res;
})
.then(someOtherFunction)
.catch(err => {
    console.log(err);
}) 