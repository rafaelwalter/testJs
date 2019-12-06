
let globalVariable = 1;

const user = {
    name: 'potato',
    lastName: 'batata',
};

const getFullName = (user_) => {
    // immutability
    const userCopy = { ...user_ };
    // not pure - use side effects
    globalVariable += 1;
    userCopy.fullName = `${user_.name} ${user_.lastName} ${globalVariable}`;
    return userCopy.fullName;
};

const getFullNamePure = (u, localVariable) => {
    return  `${u.name} ${u.lastName} ${localVariable}`
};

let fullName = getFullNamePure(user, 1);
console.log(1, fullName);

fullName = getFullNamePure(user, 2);
console.log(2, fullName);

fullName = getFullNamePure(user, 1);
console.log(3, fullName);


// let fullName = getFullName(user);
// console.log(1, fullName);

// fullName = getFullName(user);
// console.log(2, fullName);

// fullName = getFullName(user);
// console.log(3, fullName);

console.log('original data', JSON.stringify(user, null, 2));

