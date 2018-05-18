const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

let id = '5afbb49d1131bd4ffcbb34c333';

// check if invalid ID is given
if (!ObjectID.isValid(id)) {
  console.log('ID not valid');
}

Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos by find', todos);
});

//gets back an object instead of array as above---use this to find a doc other than by id
Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo by findOne', todo);
});

//gets back an object
Todo.findById(id).then((todo) => {
  //handles the error if ID isn't found
  if (!todo){
    return console.log('ID not found')
  }
  //this will run if id is found
  console.log('Todos by findById', todo);
  //catches any errors like
}).catch((e) => console.log(e));

// // Practice with Users
// let id = '5afb76e65911672cd46bbd7888';
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }
//
// //gets back an object
// User.findById(id).then((user) => {
//   //handles the error if ID isn't found
//   if (!user){
//     return console.log('User not found')
//   }
//   //this will run if id is found
//   console.log('User by findById', user);
//   //catches any errors like
// }).catch((e) => console.log(e));
