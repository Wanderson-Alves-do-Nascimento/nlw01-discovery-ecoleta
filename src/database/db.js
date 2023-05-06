const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./src/database/database.db')

db.serialize(() => {
  // Create table

  db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      name TEXT, 
      address TEXT,
      address2 TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
  `)

  // Insert data
  const query = `INSERT INTO places (
    image, 
    name, 
    address, 
    address2, 
    state, 
    city, 
    items
    ) VALUES ( ?, ?, ?, ?, ?, ?, ? );`
  
  const values = [
    "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
    "Colectoria",
    "Guilherme Gemballa, Jardim América",
    "Número 260",
    "Santa Catarina",
    "Rio do Sul",
    "Resíduos Eletrônicos, Lâmpadas"
  ]
  function afterInsertData(err){
    if(err) {
      console.log(err)
    }
    console.log("Cadastrado com sucesso")
    console.log(this)
  }
  
  // db.run(query, values, afterInsertData)

  // Querying data

  // db.all(`SELECT * FROM places`, function(err, rows){
  //   if(err){
  //     return console.log(err)
  //   }
  //   console.log("Os resultados para a pesquisa são:")
  //   console.log(rows)
  // })

  // Remove data

  // db.run(`DELETE FROM places WHERE id = ?`, [1], function(err){
  //   if(err){
  //     return console.log(err)
  //   }
  //   console.log("Registro deletado com sucesso")
  // })
})

module.exports = db