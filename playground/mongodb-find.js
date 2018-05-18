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

//returns an array or document
  db.collection('Todos').find().count().then((count) => {
    console.log(`Todos count: ${count}`);
  }, (err) => {
    console.log('Unable to fetch Todos', err);
  })

//returns all documents with name=Britt
  db.collection('Users').find({name: 'Britt'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch Todos', err);
  })

//returns all documents with name=Ryan
  db.collection('Users').find({name: 'Ryan'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch Todos', err);
  })

//returns all documents .find() in an array .toArray() then does somethign with docs .then(docs) or gives error (err)
  // db.collection('Todos').find().toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch Todos', err);
  // })

//returns all documents with true for completed
  // db.collection('Todos').find({completed: true}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch Todos', err);
  // })

//returns document with the id object
  // db.collection('Todos').find({
  //   _id: new ObjectID('5afb2ebbeeeed73ffc1e7e02')
  // }).toArray().then((docs) => {  //returns an array or document
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch Todos', err);
  // })

  //closes client db connection
  // client.close();
})
