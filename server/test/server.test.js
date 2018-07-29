const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  completed: false
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done()
).catch(e => console.log(e));
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .get(`/todos/1111`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get(`/todos/xadghh@`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    request(app)
      .delete(`/todos/${todos[1]._id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(`${todos[1]._id}`)
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(todos[1]._id).then((result) => {
          expect(result).toNotExist();
        });
        done();
      });
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .delete(`/todos/111111`)
      .expect(404)
      .end(done);
  });

  it('should teturn 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/itsaninvalidid@#%')
      .expect(404)
      .end(done);
  })
})

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    var id = todos[0]._id;
    var newText = "Text is changed!";
    request(app)
      .patch(`/todos/${id}`)
      .send({
        text: newText,
        completed: true
      })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(newText);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
    // update text, set completed to true
    // 200
    // text is changed, completed is true, completedAt is a number .toBeA
  });

  it('should clear completedAt when todo is not completed', (done) => {
    var id = todos[1]._id;
    var newText = "Updated text!";
    var newCompleted = false;
    request(app)
      .patch(`/todos/${id}`)
      .send({
        text: newText,
        completed: newCompleted
      })
      .expect(200)
      .expect(result => {
        expect(result.body.todo.text).toBe(newText);
        expect(result.body.todo.completedAt).toNotExist();
      })
      .end(done);
    // update text, set completed to false
    // 200
    // text is changed, completed false, completedAt is null .toNotExist
  })
})
