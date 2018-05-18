
const mongoose = require('mongoose');
//create a Mongoose model so it knows how to store the data
//1st arg is the string name, 2nd is an ogject to define properties for a model
const Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator: {   //updated model to create association between user and todo
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = {Todo};

//examples:
// //create a variable (any name you want) must create a new instance of Todo
// let newTodo = new Todo({
//   text: 'Cook Dinner'
// })
//
// //creating the instance above doesn't save it to the db... variableName.save()
// newTodo.save().then((doc) => {
//   console.log('Saved Todo:', doc);
// }, (e) => {
//   console.log('Unable to save todo');
// })
