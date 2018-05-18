const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = "123abc!"

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash)
  });
});

let hashedPassword = '$2a$10$O/aUoVC80XAkg9TAdl1vweHBXtQNxUu.iwmLjeYkLyXBFVzPU2GUa'

bcrypt.compare(password, hashedPassword, (err, res) =>{
  console.log(res);
})

// jwt.sign //takes the object with data user id signs it -< creates the has and returns token value
// jwt.verify //takes the token and secret and makes sure data wasn't manipluated
//
// let data = {
//   id : 10
// };
//
// let token = jwt.sign(data, 'abc123')
// console.log('token', token);
//
// let decoded = jwt.verify(token, 'abc123')
// console.log('decoded', decoded);
//


// ******using crypto-js
// let message = 'I am user number 3';
//
// let hash = SHA256(message).toString();
//
// console.log(`message ${message}`);
// console.log(`hash ${hash}`);
//
//
// let data = {
//   id : 4
// };
//
// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data)+ 'somesecret').toString()
// }
// console.log(`token.hash ${token.hash}`);
//
// let resultHash = SHA256(JSON.stringify(token.data)+ 'somesecret').toString()
// console.log(`resultHash ${resultHash}`);
//
//
// if (resultHash === token.hash) {
//   console.log("data not changed");
// }else {
//   console.log("data WAS changed");
// }
