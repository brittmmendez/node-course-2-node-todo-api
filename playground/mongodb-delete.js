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

//deleteMany - deletes all
  db.collection('Todos').deleteMany({text: 'something to do'}).then((result) => {
    console.log(result);
  })

//deleteOne - deletes first one
  db.collection('Todos').deleteOne({text: 'Walk dog'}).then((result) => {
    console.log(result);
  })

//findOneAndDelete
  db.collection('Todos').findOneAndDelete({text: 'Cook Dinner'}).then((result) => {
    console.log(result);
  })

//deletes all users named Britt
  db.collection('Users').deleteMany({name: 'Britt'});

//finds user with this object ID and deletes them
  db.collection('Users').findOneAndDelete({
    _id: new ObjectID("5afb32d0bf6b212afca73419")
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  })


  //closes client db connection
  // client.close();
})
