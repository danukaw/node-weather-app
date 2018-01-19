console.log('Starting app');

setTimeout(()=>{console.log('inside the call back function 1')}, 2000);

setTimeout(()=>{console.log('inside the call back function 2')}, 0);

console.log('Finishing up');