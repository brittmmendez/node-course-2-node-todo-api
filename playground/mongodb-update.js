// const MongoClient = require('mongodb').MongoClient;
//this code below is same as code above except we're also pulling off ocjectID to create our own uniqu ids
const {MongoClient, ObjectID}= require('mongodb');

//create the db connect /TodoApp < new file that the db will be stored at. CB function with err and client
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  //sends a msg to console for success or error
  if (err) {
    return console.log('Unable to connect to MongoDB Server');
  }

//access to db referecnce TodoApp
  const db = client.db('TodoApp')
  console.log('Conected to MongoDB Successfully');

  findOneAndUpdate(filter, update, options, callback) ** returns Promise if no callback passed
  db.collection('Todos').findOneAndUpdate({
    _id : new ObjectID('5afb48241bf560174727e1d1')   //find thh doc with this id
  }, {
    $set: {
      completed: true   //change false to true
    }
  }, {
    returnOriginal: false  //don't return the orignal
  }).then((result) => {   //given the promise
    console.log(result);  //log result
  })

  db.collection('Users').findOneAndUpdate({
    _id : new ObjectID('5afb3308c8d6df02449d5b5b')
  }, {  //find the doc with name Carley
    $set: {
      name: 'Carley',  //change name to Brittany
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false  //don't return the orignal
  }).then((result) => {   //given the promise
    console.log(result);  //log result
  })


  //closes client db connection
  // client.close();
})
