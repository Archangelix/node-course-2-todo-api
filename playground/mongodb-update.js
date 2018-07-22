// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/testTodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server.')

  // db.collection('Todos').findOneAndUpdate({_id : new ObjectID("5b4d1d2fd1d1044cd13d49e9")},{
  //   $set: {
  //     completed: false
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // })

  db.collection('Users').findOneAndUpdate({name:'Iwan'}, {
    $set: {
      name: 'Iwan2'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then(result => console.log(result))
});
