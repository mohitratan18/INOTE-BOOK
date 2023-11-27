const connectdb = require('./database');
connectdb();
const express = require('express');
const router = express.Router();
const app = express();
var cors = require('cors')
app.use(cors())
app.use(express.json())
// available routes
app.get('/',(req,res)=>{
    res.send('hello');
})
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen('5000',()=>{
    console.log('port running at 5000');
})
module.exports = router;