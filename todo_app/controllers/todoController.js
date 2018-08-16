
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Connect to the database 
mongoose.connect('mongodb://test:k500k500@ds223812.mlab.com:23812/todo', {useNewUrlParser:true});

//Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

//Create a model - use Uppercase
var Todo = mongoose.model('Todo', todoSchema);

//dummy item for the database
/* var itemOne = Todo({item:'Go Swimming'}).save((err)=>{
  if(err) throw err;
  console.log('item saved')

}); */


//dummy data
var data = [{ item: 'get milk' }, { item: 'walk a dog' }, { item: 'relax' }];
//middleware
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {




  app.get('/todo', (req, res) => {
    //get data from MongoDb and pass it to the view. If needed a specific item - {item:"go swimming"};
    Todo.find({}, (err, data)=>{
      if(err) throw err;
      //passing items we found using .find methon on the Database
      res.render('todo', { todos: data });

    });

  });

  
  app.post('/todo', urlencodedParser, function (req, res) {
    //get data from the view and add it to mongodb
    // grabbing an item from req.body
    var newTodo = Todo(req.body).save((err)=>{
      if (err) throw err;
      res.json(data);

    });
/*     data.push();
 */  });



  app.delete('/todo/:item', (req, res) => {
    //detele the requested item from MongoDb
    Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove((err)=>{
      if(err) throw err;
      res.json(data);
    });

/*       data = data.filter((todo)=>{
        return todo.item.replace(/ /g, '-') !== req.params.item;
      });
      res.json(data); */
  });



};