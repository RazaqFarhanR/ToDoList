const mysql = require('mysql2')

const db = mysql.createConnection({
    host: "localhost",
    password: "",
    user: "root",
    database: "TugasPraktikum3_react"
})

db.connect(err => {
    if(err){
        console.log(err.message)
    }
    else{
        console.log("koneksi berhasil")
    }
})

module.exports = db