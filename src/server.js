const express = require('express');
const app = express();

// Importar Banco de Dados
const db = require('./database/db') 

console.log('Server is running in port 3000')

app.use(express.static("public"))

// Habilita o uso do request.body no express
app.use(express.urlencoded({
  extended: true
}))

// Template Engine

const nunjucks = require('nunjucks')

nunjucks.configure("src/views",{
  express: app,
  noCache: true
})

app.get('/', (req, res)=>{
  return res.render("index.html")
})

app.get('/create-point', (req, res) =>{

  // Query Strings - São os resultados do que foi inserido no formulário.
  console.log(req.query)

  res.render("create-point.html")
})

app.post('/save-point', (req, res)=> {
   // Insert data
   const query = `INSERT INTO places 
    (image,name,address,address2,state,city,items) 
    VALUES
    ( ?, ?, ?, ?, ?, ?, ? );`
  
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]
  function afterInsertData(err){
    if(err) {
      console.log(err)
      return res.render("create-point.html", {error: true})
    }
    console.log("Cadastrado com sucesso")
    console.log(this)
    
    return res.render('create-point.html', {saved: true})  
  }
  // res.send (values)
  db.run(query, values, afterInsertData)
})

app.get('/search', (req, res)=>{
  db.all(`SELECT * FROM places;`, function(err, rows){
    if(err){
      return console.log(err)
    }
    const total = rows.length
    return res.render("search-results.html", {places: rows, total})
  })
})

app.get('/search-results', (req, res) =>{
  const search = req.query.search
  if(search == ""){
    return res.render("search-results.html", {total: 0})
  }
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
    if(err){
      return console.log(err)
    }
    const total = rows.length
    return res.render("search-results.html", {places: rows, total})
  })
})

app.listen('3000')
