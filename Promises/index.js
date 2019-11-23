const returnPromise = (flag) => {
    return new Promise(function(resolve, reject) {
        flag ? resolve('your promise was resolved..') : resolve('ermm.. rejected.') 
    });
}

returnPromise(true)
.then(res => {
    console.log(res);
})
.catch(err => {
    console.log(err);
}) 