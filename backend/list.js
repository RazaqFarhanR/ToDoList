const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const db = require('./config')

//endpoint GET ALL 
app.get('/', (req,res) => {
    let sql = "select * from list"
    db.query(sql, (err,result) => {
        if (err) {
            res.json({
                message: err.message
            })
        }
        else {
            res.json({
                count : result.length,
                list : result
            })
        }
    })
})

//endpoint search 
app.post('/' , (req,res) =>{
    let data = {
        status: req.body.status
    }
    let sql = "select * from list where ?"
0
    db.query(sql,data, (err,result) => {
        if (err) {
            res.json({
                message: err.message
            })
        }
        else {
            res.json({
                count : result.length,
                list : result
            })
        }
    })
})

//endpoint save  
app.post('/save', (req,res) => {
    let data = {
        catatan: req.body.catatan,
        status: req.body.status
    }
    let sql = "insert into list set ?"
    db.query(sql,data, (err,result) =>{
        if (err) {
            res.json({
                message: err.message
            })
        }
        else {
            res.json({
                message: result.affectedRows + " row inserted"
            })
        }
    })
})

//update
app.post('/update', (req,res) => {
    let data = [
    {
        catatan: req.body.catatan,
        status: req.body.status
    },
        req.body.id_list
    ]    
    let sql = "update list set ? where id_list = ?"
    db.query(sql,data, (err,result) =>{
        if (err) {
            res.json({
                message: err.message
            })
        }
        else {
            res.json({
                message: result.affectedRows + " row updated"
            })
        }
    })
})

app.delete('/:id_list', (req,res) => {
    let data ={
        id_list: req.params.id_list
    }
    let sql = "delete from list where ?"
    db.query(sql, data, (err,result) => {
        if (err) {
            res.json({
                message: err.message
            })
        }
        else {
            res.json({
                message: result.affectedRows + " row deleted"
            })
        }
    })
})
module.exports = app
