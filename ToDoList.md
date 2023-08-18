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

Steps:

1. `mkdir server` -> `cd server` -> `npm init` (defaults hit enter the whole way)
2. `npm i express pg cors`

* express allows quickly create server in nodejs
* cors allows different domain applications to interact with each other
* React runs on localhost 3000
* Server on localhost 5000
* pg connects the database with the server

3. touch index.js

4. Package: `nodemon` for constant feedback
   1. nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected. nodemon does not require any additional changes to your code or method of development. nodemon is a replacement wrapper for node. To use nodemon, replace the word node on the command line when executing your script.
   2. https://www.npmjs.com/package/nodemon

Nodemon installation:

`npm install -g nodemon # or using yarn: yarn global add nodemon`

5. Create middleware

6. Get data from the REQUEST body with use function

7. Create database.sql in directory

Create a Schema because we want the data to be structured

8. Use terminal to start up the PostGRES

`psql -U postgres`

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
* add in a try catch block
* Use postman to test the API
* Run nodemon with nodemon index

11a. Using POSTMAN
Create a new collection and make a request
POST to `http://localhost:5000/todos` then write a `raw` `json` in the body

12. Inserting and working with SQL commands

```
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
```

13. Create a todo

Todo

```      // Create a todo
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
      })```

14.  GET query with index.js

GET

```      app.get("/todos/:id", async(req, res) => {
         try{
            const{ id } = req.params;
            const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id])
            res.json(todo.rows[0]);
         }
         catch (err){
            console.error(err.message);
         }
      })
```
15. Update (PUT) a todo

UPDATE

```      app.put("/todos/:id", async (req, res) => {
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
      })```

16. DELETE

DELETE

```      app.delete("/todos/:id", async(req, res) => {
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
      })```

17. SQL queries can be inputted directly into the terminal

- WHERE allows client to direct the GET query
- SET describes the column that we are going to change

18. npx create-react-app client
    Get rid of all the files in src except App.css, app,js, index.css, and index.js

19. Clean up the App.js file

21. Create components folder
    Create EditTodos.js, InputTodos.js and ListTodos.js

22. Introduce Bootstrap
    Go to documentation
    Add the CSS and JS CDN to index.html

23. Building the input todo component

24. Add to App.js

25. InputTodos
    Changes before React-ifying

26. Setting up react such that values can change

27. Working on the List Todo

28. Mapping in ListTodos

29. Creating the Edit Todo

# LEARNING

1. Javascript can only execute one statement at a time (single threaded)
   Network request to a database can take some time to complete
   This can end up blocking the code

2. CDN = Content delivery network.
   It is a geographically distributed group of servers that work
   together to provide fast delivery of Internet content.

3. npm start won't work unless you are in the client
