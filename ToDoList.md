**Structure of the program**
<img src="structure.jpeg" alt="">

1.  When the submit button is clicked, an HTTP request is sent to the RESTFUL api

2.  RESTful(Representational State Transfer) API simplified

- A web API that obeys the REST constraints is informally described as RESTful.
- In a RESTful Web service, requests made to a resource's URI (Uniform resource identifier) elicit a response with a payload formatted in HTML, XML, JSON, or some other format. The most common protocol for these requests and responses is HTTP, which provides operations (HTTP methods) such as OPTIONS, GET, POST, PUT, PATCH and DELETE.
- Uses transfer protocol to run CRUD operations (Create, read, update, delete)

| CRUD   | HTTP                                |
| ------ | ----------------------------------- |
| Create | POST, PUT if we have `id` or `uuid` |
| Read   | GET                                 |
| Update | PUT                                 |
| Delete | DELETE                              |

| HTTP method | Description                                                                                                              |
| :---------: | ------------------------------------------------------------------------------------------------------------------------ |
|    POST     | Let the target resource process the representation enclosed in the request.                                              |
|     PUT     | Create or replace the state of the target resource with the state defined by the representation enclosed in the request. |
|    PATCH    | Partially update resource’s state.                                                                                       |
|   DELETE    | Delete the target resource’s state.                                                                                      |
|   OPTIONS   | Advertising the available methods.                                                                                       |

CRUD operations only occur within our database

Instructions:

1. `mkdir server` -> `cd server` -> `npm init` (defaults hit enter the whole way)
2. npm i express pg cors

   1. express allows quickly create server in nodejs
   2. cros allows different domain applications to interact with each other
      1. React runs on localhost 3000
      2. Server on localhost 5000
      3. pg connects the database with the server

3. touch index.js

   1. See code with comments
   2. Create the app initially

4. Package: `nodemon` for constant feedback
   1. nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected. nodemon does not require any additional changes to your code or method of development. nodemon is a replacement wrapper for node. To use nodemon, replace the word node on the command line when executing your script.
   2. https://www.npmjs.com/package/nodemon

Nodemon installation:

    npm install -g nodemon # or using yarn: yarn global add nodemon

5. Create middleware??

6. Get data from the REQUEST body with use function

7. Create database.sql in directory
   **Database Structure**
   <img src="structure.jpeg" alt="">

Create a Schema because we want the data to be structured

8. Use terminal to start up the PostGRES

   psql -U postgres

Ensure that the path is configured for psql to work

Homebrew install

echo 'export PATH="/opt/homebrew/opt/postgresql15/bin:$PATH"' >> ~/.zshrc

9. Connect in and run the commands from database.sql and create the database
   \l will show all databases
   \c to connect to into database
   \dt looks at all tables inside database

10. Setting up the config of the database in db.js

See the node pg documentation
pass in the config user,password, host, port, database into a new Pool constructor
contained in `pool`. Export it with `module.exports = pool`
Require the database in index.js with
`const pool = require("./db");`

11. Create routes
1. add in a try catch block
1. Use postman to test the API
1. Run nodemon with nodemon index

11a. Using POSTMAN
Create a new collection and make a request
POST to `http://localhost:5000/todos` then write a `raw` `json` in the body

12. Inserting and working with SQL commands

todolist=# INSERT into todo(description) VALUES ('hello');
INSERT 0 1
todolist=# \dt
List of relations
Schema | Name | Type | Owner  
 --------+------+-------+----------
public | todo | table | postgres
(1 row)

todolist=# SELECT \* FROM todo;
todo_id | description  
 ---------+---------------
1 | Stuff
2 | Clean my room
3 | hello
(3 rows)

todolist=#

13. Create a todo

Todo

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

1.  GET query with index.js

GET

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

15. Update (PUT) a todo

UPDATE

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

16. DELETE

DELETE

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

17. SQL queries can be inputted directly into the terminal

- WHERE allows client to direct the GET query
- SET describes the column that we are going to change

18. npx create-react-app client
    Get rid of all the files in src except App.css, app,js, index.css, and index.js

19. Clean up the App.js file

import React, {Fragment} from 'react';
import './App.css';

function App() {
return (
<Fragment></Fragment>
);
}

export default App;

20. Clean up the index.js file

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
<App />
</React.StrictMode>
);

21. Create components folder
    Create EditTodos.js, InputTodos.js and ListTodos.js

22. Introduce Bootstrap
    Go to documentation
    Add the CSS and JS CDN to index.html

23. Building the input todo component

import React from 'react';

const InputTodo = () =>{
return <h1> Input Todo </h1>;
}

export default InputTodo;

24. Add to App.js

//Components
import InputTodo from './components/InputTodos';

function App() {
return (
<Fragment>
<InputTodo />
</Fragment>
);
}

export default App;

25. InputTodos
    Changes before React-ifying

import React, {Fragment} from 'react';

const InputTodo = () =>{
return (
<Fragment>
<h1 className='text-center mt-5'> Input Todo List </h1>
<form className='d-flex mt-5'>
<input text='text' className='form-control'/>
<button className='btn btn-success '> Add </button>
</form>
</Fragment>
)};

export default InputTodo;

26. Setting up react such that values can change

import React, {Fragment, useState} from 'react';

const InputTodo = () =>{
// description is the state
// set description is the only way to change the state
// For example if the client puts "Hello" it will show up in react website bar
const [description, setDescription] = useState("");

      const onSubmitForm = async (event) => {
         event.preventDefault();
         try{
               const body = {description};
               // By default fetch makes a GET request
               const response = await fetch('http://localhost:5000/todos', {
                  method: 'POST',
                  headers: {'Content-type': 'application/json' },
                  body: JSON.stringify(body)
               });

               window.location = "/"
         }
         catch (err){

               console.err(err.message);
         }
      }

      //e.target.value targets whatever is in the input and grabs the value
      return (
      <Fragment>
         <h1 className='text-center mt-5'> Input Todo List </h1>
         <form className='d-flex mt-5' onSubmit={onSubmitForm}>
               <input
                  text='text'
                  className='form-control'
                  value={description}
                  onChange={event => setDescription(event.target.value)}
               />
               <button className='btn btn-success '> Add </button>
         </form>
      </Fragment>

)};

export default InputTodo;

27. Working on the List Todo

Prior to mapping

import React, { Fragment ,useEffect, useState} from 'react';

const ListTodos = () => {
// creates a json state that we can edit
const[todos, setTodos] = useState([]);

      const getTodos = async () => {
         try{
               // fetches request to GET the json data.
               const response = await fetch("http://localhost:5000/todos")
               // Stores the json data
               const jsonData = await response.json();
               setTodos(jsonData);
         }
         catch(err){
               console.error(err.message);
         }
      }
      //[] makes it such that there will be only one request
      useEffect(() => {
         getTodos();
      },[]);

      //console.log(todos);

      return <Fragment>
         <table className='table mt-5 text-center'>
               <thead>
                  <tr>
                     <th>Description</th>
                     <th>Edit</th>
                     <th>Delete</th>
                  </tr>
               </thead>

               {/* <td>John</td>
                  <td>Doe</td>
                  <td>john@example.com</td> */}
         </table>
      </Fragment>;

};

export default ListTodos;

28. Mapping in ListTodos

Backticks allow for inline parsing in javascript ``

import React, { Fragment ,useEffect, useState} from 'react';

const ListTodos = () => {
// creates a json state that we can edit
const[todos, setTodos] = useState([]);

      // Go to todo and delete the id that is specified
      const deleteTodo = async (id) => {
         try{
               const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                  method: "DELETE"
               });
               //only returns the todo if it satifies the condition
               //if the todo.todo_id is not equal to the id that is specified in the argument then it will return it.
               //Basically it spits out everything that is NOT clicked by the button.
               setTodos(todos.filter(todo => todo.todo_id !== id));
         }
         catch(err){
               console.log(err.message);
         }
      }

      const getTodos = async () => {
         try{
               // fetches request to GET the json data.
               const response = await fetch("http://localhost:5000/todos")
               // Stores the json data
               const jsonData = await response.json();
               setTodos(jsonData);
         }
         catch(err){
               console.error(err.message);
         }
      }
      //[] makes it such that there will be only one request
      useEffect(() => {
         getTodos();
      },[]);

      //console.log(todos);

      return <Fragment>
         <table className='table mt-5 text-center'>
               <thead>
                  <tr>
                     <th>Description</th>
                     <th>Edit</th>
                     <th>Delete</th>
                  </tr>
               </thead>
               <tbody>
                  {/* <td>John</td>
                     <td>Doe</td>
                     <td>john@example.com</td> */}
                  {todos.map(todo => (
                     <tr key = {todo.todo_id} >
                           <td>{todo.description}</td>
                           <td> Edit </td>
                           <td>
                              <button
                              className='btn btn-danger'
                              onClick={() => deleteTodo(todo.todo_id)}
                              >
                                 Delete
                              </button>
                           </td>
                     </tr>
                  ))}

               </tbody>
         </table>
      </Fragment>;

};

export default ListTodos;

29. Creating the Edit Todo

import React, { Fragment, useState } from "react";

//Todo is a prop
const EditTodo = ({ todo }) => {
// description because we want to edit hte information so we need to know what is already there
const [description, setDescription] = useState(todo.description);

//edit description: Error function with async
const updateDescription = async (e) => {
e.preventDefault();
/_ Any time we are adding data we need to package it up _/
try {
const body = { description };
const response = await fetch(
`http://localhost:5000/todos/${todo.todo_id}`,
{
method: "PUT",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(body),
}
);
//alternative window.location.reload()
window.location = "/";
} catch (err) {
console.error(err.message);
}
};

return (
<Fragment>
{/_ Modals work by targetting a specific ID (in this case #myModal) _/}
{/_ Button to Open the Modal _/}
<button
type="button"
className="btn btn-warning"
data-bs-toggle="modal"
data-bs-target={`#id${todo.todo_id}`}
//Accounts for clicking outside after changing the description, but you don't want to edit
onClick={() => setDescription(todo.description)} >
Edit
</button>

         {/* <!-- The Modal --> */}
         {/* Change the modal id with `template strings` */}
         {/* Example of tempplate string: id = id10 */}
         <div className="modal" id={`id${todo.todo_id}`}>
         <div className="modal-dialog">
            <div className="modal-content">
               {/* <!-- Modal Header --> */}
               <div className="modal-header">
               <h4 className="modal-title">Edit Todo</h4>
               <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  //changes the edit so it resets afte exiting out
                  onClick={() => setDescription(todo.description)}
               ></button>
               </div>

               {/* <!-- Modal body --> */}
               <div className="modal-body">
               {/* Add in form-control */}
               <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
               />
               </div>

               {/* <!-- Modal footer --> */}
               <div className="modal-footer">
               {/* add in an edit button */}
               <button
                  type="button"
                  className="btn btn-warning"
                  data-bs-dismiss="modal"
                  onClick={(e) => updateDescription(e)}
               >
                  Edit
               </button>
               <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={() => setDescription(todo.description)}
               >
                  Close
               </button>
               </div>
            </div>
         </div>
         </div>
      </Fragment>

);
};

export default EditTodo;

# LEARNING

1. Javascript can only execute one statement at a time (single threaded)
   Network request to a database can take some time to complete
   This can end up blocking the code

2. CDN = Content delivery network.
   It is a geographically distributed group of servers that work
   together to provide fast delivery of Internet content.

3. npm start won't work unless you are in the client
