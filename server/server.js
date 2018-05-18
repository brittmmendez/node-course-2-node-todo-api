require('./config/config');

//library imports
const _ = require('lodash');      //Lodash makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings, etc.
const express = require('express');      //Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
const bodyParser = require('body-parser');      //Parse incoming request bodies in a middleware before your handlers
const {ObjectID} = require('mongodb');      //Create a new ObjectID instance

//local imports
const {mongoose} = require('./db/mongoose');      //Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');


const app = express();      //stores the express application
const port = process.env.PORT //sets up local port or heroku port

app.use(bodyParser.json());     //middleware - takes the body data sent from client json and convert it to an object attaching it on to the request object

//CREATE - make new todo by sending JSON obj with text prop to server -> server will take it create document and send back doc
app.post('/todos', authenticate, (req, res) => {
  let newTodo = new Todo({     //create an instance of mongoose model
    text: req.body.text,
    _creator: req.user._id
  });

  newTodo.save().then((doc) =>{     //save model to db
    res.send(doc)
  }, (e) => {
    res.status(400).send(e);
  });
});

//READ
  app.get('/todos', authenticate, (req, res) => {
    Todo.find({
      _creator: req.user._id  //only returns todo  made by this user
    }).then((todos) =>{    //create an instance of mongoose model
      res.send({todos});
    }, (e) => {
      res.status(400).send(e);
    });
  });

//READ by ID
app.get('/todos/:id', authenticate, (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {      //validate id
    return res.status(404).send();
  };

  Todo.findOne({
    _id: id,
    _creator: req.user._id  //only returns todo  made by this user
  }).then((todo) => {    //create an instance of mongoose model
    if (!todo) {      //handles the error if ID isn't found
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

//DELETE by ID
app.delete('/todos/:id', authenticate, (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {      //validate id
    return res.status(404).send();
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id  //only returns todo  made by this user
  }).then((todo) => {   //create an instance of mongoose model
    if (!todo) {      //handles the error if ID isn't found
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});



//UPDATE by id
  app.patch('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);     //needed lodash for this specifically so users can't change things I don't want them to. This checks the body of the request and picks the two items in my array and will only update this

    if (!ObjectID.isValid(id)) {      //validate id
      return res.status(404).send();
    };

    if (_.isBoolean(body.completed) && body.completed) {    //updated the completed at based on body prop
      body.completedAt = new Date().getTime();
    }else{
      body.completed = false;
      body.completedAt = null;
    }

    Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((todo) => {  //make our call to find by id and update
      if (!todo) {    //handles the error if ID isn't found
        return res.status(404).send();
      }

      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    })
  });

//***************Users***************//
// POST /users  -> sign up
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();   //call the method to geenrate token
  }).then((token) => {
    res.header('x-auth', token).send(user);  //send the token back as an http header. x-auth is a custom header for our specific purpose.
  }).catch((e) => {
    res.status(400).send(e);
  })
});

// GET /users/:id
app.get('/users/me', authenticate, (req, res) => {  //runs middleware authencate and sends response below if no errors
  res.send(req.user);  //sending the user the request with the info we found/set in findByToken
});


//POST /user/login {email, password}
app.post('/users/login', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {    //call to veryfy if  user exsists with that email. check password
    user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);  //send the token back as an http header. x-auth is a custom header for our specific purpose.
    });
  }).catch((e) =>{
    res.status(400).send();
  });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
})

module.exports = {app};
