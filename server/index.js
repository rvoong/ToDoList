const express =  require("express"); // requires library
const app = express(); // variable that runs the express library
const cors = require("cors");
//connection
const pool = require("./db");  // lets us add req.body

// middleware
app.use(cors());
// Any time we are building a fullstack app, we have to get data from the client side
// Have to get it from the REQUEST.body
// Gets json data
app.use(express.json()); //req.body (object)

// ROUTES//
// Create a todo
// post adds data. Named it todos
//(req, res) represents REQUEST on the client side and response from the server
// async simply waits for the function to finish before it continues
      // Javascript can only execute one statement at a time (single threaded) 
      // Network request to a database can take some time to complete
      // This can end up blocking the code
      // Arrow Function:
app.post("/todos", async(req, res) => {
   try{
      const {description} = req.body;
      const newTodo = await pool.query(
         // Returning is used whenever you are updating data
         "INSERT INTO todo (description) VALUES($1) RETURNING *",
         [description]
      );
      res.json(newTodo.rows[0])
   } catch (err){
      console.error(err.message);
   }
})
// get all todos

app.get("/todos", async(req, res) => {
   try{
      const allTodos = await pool.query("SELECT * FROM todo")
      res.json(allTodos.rows)
   }
   catch (err) {
      console.log(err.message)
   }

})
// get a todo
//`:id` can be named to whatever you wish. It is dynamic. See POSTMAN.
app.get("/todos/:id", async(req, res) => {
   try{
      const{ id } = req.params;
      const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id])
      res.json(todo.rows[0]);
   }
   catch (err){
      console.error(err.message);
   }
})


// update a todo
app.put("/todos/:id", async (req, res) => {
   try{
      const { id } = req.params;
      const{ description } = req.body;
      const updateTodo = await pool.query
         ("UPDATE todo SET description = $1 WHERE todo_id = $2", 
         [description, id]);
      res.json("todo was updated");
   }
   catch (err){
      console.log(err.message);
   }
})

// delete a todo
app.delete("/todos/:id", async(req, res) => {
   try{
      const{ id } = req.params;
      const deleteTodo = await pool.query
         ("DELETE FROM todo WHERE todo_id = $1", 
         [id]);
      res.json("todo was deleted");
   } 
   catch(err){
      console.log(err.message);
   }
})



 // Starts the sever with listen to port number 
 // Callback function to indicate that it has started
 app.listen(5000, () => {
    console.log("server has started on port 5000");
 });

