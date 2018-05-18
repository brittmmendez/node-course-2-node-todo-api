const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Todo.remove -> lets you delete multiple records that it matchs.  can't pass in an empty arg

//Todo.findOneAndRemove -> matches first doc and removes it. returns object it deleted
Todo.findOneAndRemove(_id: '5afbb49d1131bd4ffcbb34c3').then((todo) => {
  console.log(todo);
});

//Todo.findByIdAndRemove -> finds by id and removes that one. returns object it deleted

Todo.findByIdAndRemove('5afbb49d1131bd4ffcbb34c3').then((todo) => {
  console.log(todo);
});
