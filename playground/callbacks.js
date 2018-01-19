console.log("inside call back js");

let getUser = (id, callback) => {
    
    let user = {
        id,
        name : 'danuka',
        location : 'battaramulla'
    };
    setTimeout(()=> {
        return callback(user);
    }, 3000);

};

getUser(32, (user) => {
    console.log(`user id : ${user.id} name : ${user.name}`);
});

console.log("finished executing call backs");