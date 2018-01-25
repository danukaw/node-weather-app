
console.log("Start learning promises");

let somePromises = new Promise((resolve, reject)=>  {

    setTimeout(()=>{
       return resolve('Hi resolve the promise');
        //return reject('Hi, the promise is rejected');
    },2500);
    //return reject('Hi, the promise is rejected');
});

somePromises.then((successMesages) => {
    console.log(successMesages);
}, (errormessage)=> {
    console.log(`error message : ${errormessage}`);
});

console.log("Finish learning some promises");

let addNumbers = (a, b) => {
    return new Promise((resolve, reject) => {
        if(typeof a ==='number' && typeof b === 'number'){
            return resolve(a + b);
        } else {
            return reject('argument is not valid');
        }
    });
}

addNumbers(13,12).then((resultOfAddition)=> {
    return addNumbers(resultOfAddition, 12);
}, (errorMessage) => {
    console.log(errorMessage);
}).then((result2)=> {
    console.log(result2);
}, (errorMessage) => {
    console.log(errorMessage);
});



