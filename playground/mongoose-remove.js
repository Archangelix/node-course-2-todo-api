const {ObjectID} = require('mongodb');

const {User} = require('./../server/models/user');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

Todo.remove({}).then((result) => {
  console.log(result);
})

// Todo.findOneAndRemove((result) => {
//
// })

Todo.findByIdAndRemove('5b5d9329d1d1044cd13eb254').then((todo) => {
  console.log(todo);
});
