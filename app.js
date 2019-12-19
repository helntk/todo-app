const express = require('express');
const app = express();
const usersRouter = require('./routes/users')
const taskRouter = require('./routes/tasks')
const cors = require('cors')
const bodyParser = require('body-parser');

require('./db/db')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(usersRouter)
app.use(taskRouter)

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log('the server is up and running');
})