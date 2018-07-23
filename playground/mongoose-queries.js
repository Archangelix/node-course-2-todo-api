const {ObjectID} = require('mongodb');

const {User} = require('./../server/models/user');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '5b55e4ef9d14cdac3b677c78';
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid!');
// }
//
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo', todo);
});
//
// Todo.findById(id).then(todo => {
//   console.log('Todo', todo);
// }).catch((e) => console.log(e));

// var user = new User({
//   email: 'test@test.com'
// });
// user.save().then((doc) => {
//   console.log(doc);
// }, (e) => {
//   res.status(400).send(e);
// }).catch((e) => console.log(e));

User.findOne({
  email: 'test@test.com4'
}).then((user) => {
  if (!user) {
    return console.log('Id not found');
  }
  console.log(user);
})
