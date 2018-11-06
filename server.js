const express= require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false});

let config = "";
const isProd = process.env.DATABASE_URL != null;
if (!isProd) {
  config = require('./secrets');
}

const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DATABASE_USER || config.LOCAL_DATABASE_USER,
  host: process.env.DATABASE_HOST || config.LOCAL_DATABASE_HOST,
  database: process.env.DATABASE_NAME || config.LOCAL_DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD || config.LOCAL_DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT || config.LOCAL_DATABASE_PORT,
  ssl: isProd ? true : false
})

app.use(express.static('./dist/herokuSimpleApp'));
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app
	.get('/', (req,res) => {
		res.sendFile(path.join(__dirname,'/dist/herokuSimpleApp/index.html'));
	})
  .get('/api/student/get', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM students');
      const results = (result) ? result.rows : null
      res.send( results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  });

app
  .post('/api/student/add', async (req, res) => {
    const body = req.body;
    const query = {
      text: 'INSERT INTO students( firstname, surname, age ) VALUES ($1, $2, $3)',
      values: [body.firstname, body.surname, body.age],
    }

    const client = await pool.connect();
    client
      .query(query)
      .then(result => {
        res.status(200).json(result.rows[0]);
        client.release();
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error: "Error" })
      });

  });

app.listen(process.env.PORT || 8080, ()=>{
  console.log('Server started');
})
