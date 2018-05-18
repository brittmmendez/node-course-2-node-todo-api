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

  //creates the collection todos in todoapp db and inserts a todo document
  db.collection('Todos').insertOne({
    text: 'something to do',
    completed: false
  }, (err, result) =>{
    if (err) {
      return console.log('Unable to insert todo', err);
    }

    console.log(JSON.stringify(result.ops, undefined, 2));
  })

//creates the collection users in todoapp db and inserts a user document
  db.collection('Users').insertOne({
    name: 'Britt',
    age: 29,
    location: 'Cincy'
  }, (err, result) =>{
    if (err) {
      return console.log('Unable to insert user', err);
    }

    //returns a timestamp of when document was created.
    console.log(result.ops[0]._id.getTimestamp());
  })

  //closes client db connection
  client.close();
})
