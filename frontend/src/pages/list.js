import React from "react"
import axios from "axios"
import background from "./darkblue.jpg"
import {Modal, Button, Form} from "react-bootstrap"
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { BsCheckSquareFill } from "react-icons/bs";

export default class List extends React.Component{
    constructor(){
        super()
        this.state = {
            jumlah_list: 0,
            list : [],
            id_list: "",
            catatan: "",
            status: "",
            action: "",
            isModalOpen:false,
            selectedItem: null
        }
    }
    handleClose = () =>{
        this.setState({
            isModalOpen: false
        })
    }
    handleAdd = () =>{
        this.setState({
            isModalOpen : true,
            id_list: "",
            catatan: "",
            status: "uncompleted",
            action: "insert"
        })
    }
    handleEdit = (selectedItem) =>{
        // console.log(selectedItem)
        this.setState({
            isModalOpen : true,
            id_list: selectedItem.id_list,
            catatan: selectedItem.catatan,
            status: selectedItem.status,
            action: "update"
        })
    }
    handleSave = (e) =>{
        //setting data
        e.preventDefault()
        let data = {
            id_list: this.state.id_list,
            catatan: this.state.catatan,
            status: this.state.status
        }
        // console.log(data)
        let url =""
        //setting url
        if (this.state.action === "insert") {
            url = "http://localhost:4880/list/save"
        }
        else if (this.state.action === "update"){
            url = "http://localhost:4880/list/update"
        }
        //panggil api backend
        axios.post(url, data)
        .then(res => {
            console.log(res.data.message)
            this.getList()
            this.handleClose()
        })
        .catch(err => {
            console.log(err.message)
        })
        window.location.reload(false)
    }
    handleDelete = (id_list) => {
        let url = "http://localhost:4880/list/" + id_list

        if (window.confirm('Anda yakin ingin menggapus data ini?')){
            axios.delete(url)
            .then(res => {
                console.log(res.data.message)
                this.getList()
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    setCompleted = (selectedItem) =>{
        let url = "http://localhost:4880/list/update"
        // console.log("search")
        let data ={
            id_list: selectedItem.id_list,
            catatan: selectedItem.catatan,
            status: "completed"
        }
        axios.post(url, data)
            .then(res =>{
            this.getList()
        })
        .catch(err =>{
            console.log(err.message)
        })
        
    }
    setUcompleted = (selectedItem) =>{
        let url = "http://localhost:4880/list/update"
        // console.log("search")
        let data ={
            id_list: selectedItem.id_list,
            catatan: selectedItem.catatan,
            status: "uncompleted"
        }
        axios.post(url, data)
            .then(res =>{
            this.setState({
                list: res.data.list
            })
            this.getList()
        })
        .catch(err =>{
            console.log(err.message)
        })
        
    }
    getCompleted = () =>{
        let url = "http://localhost:4880/list"
        // console.log("search")
        let data ={
            status: "completed"
        }
        axios.post(url, data)
            .then(res =>{
            this.setState({
                list: res.data.list
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
        
    }
    getUncompleted = () =>{
        let url = "http://localhost:4880/list"
        // console.log("search")
        let data ={
            status: "uncompleted"
        }
        axios.post(url, data)
            .then(res =>{
            this.setState({
                list: res.data.list
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
    getList = () => {
        let url = "http://localhost:4880/list"
        axios.get(url)
        .then(res => {
            //console.log(res.data)
            //console.log(res.data.count)
            //console.log(res.data.list)

            this.setState({
                jumlah_pegawai : res.data.count,
                list : res.data.list
            })
        })
    }
    componentDidMount = () => {
        this.getUncompleted()
    }
    render(){
        return(
            <div style={{ 
                backgroundImage: `url(${background})`, 
                height: "100vh",
                backgroundSize: "cover",
                backgroundRepeat: "repeat",
                backgroundPosition: "top center"
                }}>
                <div className="container col-md-7 pt-5">
                    <div className="row d-flex justify-content-center">
                        <div className="card-header row bg-dark">
                            <h1 className="text-center text-warning my-3">To Do List</h1>
                            <form onSubmit={e => this.handleSave(e)}> 
                            <div className="input-group mb-3">
                                <input type="text" name="catatan" className="form-control" placeholder="new task"
                                        onChange={this.handleChange}/>
                                <button className="btn btn-warning" type="submit">
                                    Tambahkan
                                </button>
                            </div>
                            </form>
                            <tr className="text-center my-3">
                            <div class="col btn-group" role="group" aria-label="Basic radio toggle button group">
                                {/* <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" onClick={e => this.getList(e)} defaultChecked/>
                                <label class="btn btn-outline-warning" for="btnradio1">All</label> */}

                                <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" onClick={e => this.getCompleted(e)}/>
                                <label class="btn btn-outline-warning" for="btnradio2">Completed</label>

                                <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" onClick={e => this.getUncompleted(e)} defaultChecked/>
                                <label class="btn btn-outline-warning" for="btnradio3">Uncompleted</label>
                            </div>
                            </tr>
                        </div>
                        <div className="card-body row bg-warning">
                            {this.state.list.map((item, index) => {
                                return(
                                    <div key={index} className="container">
                                        <div className="alert list-group-item bg-dark text-warning">
                                            {/* {
                                                (()=>{
                                                    if (item.status === "completed"){
                                                        return(
                                                            <div className="row">
                                                            <div className="col-9">{item.catatan}</div>
                                                            <div className="col-1 align-self-end text-success" onClick={() => {this.setCompleted(item)}}><BsCheckSquareFill  size={20}/> </div>
                                                            <div className="col-1 align-self-end" onClick={() => {this.handleEdit(item)}}><MdEdit  size={20}/> </div>
                                                            <div className="col-1 align-self-end" onClick={() => {this.handleDelete(item.id_list)}}><MdDeleteForever size={20}/> </div>
                                                        </div>
                                                        )
                                                    } else {
                                                        return(
                                                            <div className="row">
                                                            <div className="col-9">{item.catatan}</div>
                                                            
                                                            <div className="col-1 align-self-end" onClick={() => {this.handleEdit(item)}}><MdEdit  size={20}/> </div>
                                                            <div className="col-1 align-self-end" onClick={() => {this.handleDelete(item.id_list)}}><MdDeleteForever size={20}/> </div>
                                                        </div>
                                                        )
                                                    }
                                                })
                                            } */}
                                            <div className="row">
                                                <div className="col-10">{item.catatan}</div>
                                                {/* <div className="col-1 align-self-end text-success" onClick={() => {this.setCompleted(item)}}><BsCheckSquareFill  size={20}/> </div> */}
                                                <div className="col-1 align-self-end" onClick={() => {this.handleEdit(item)}}><MdEdit  size={20}/> </div>
                                                <div className="col-1 align-self-end" onClick={() => {this.handleDelete(item.id_list)}}><MdDeleteForever size={20}/> </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                
                {/* Ini Modal*/}
                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>To Do List</Modal.Title>
                </Modal.Header>
                <Form onSubmit={e => this.handleSave(e)}>
                <Modal.Body>
                    <Form.Group className="mb3">
                        <Form.Control type="hidden" name="id_list" value={this.state.id_list} 
                                        onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb3" controlId="catatan">
                        <Form.Label>Masukan Tugas</Form.Label>
                        <Form.Control type="text" name="catatan" placeholder="Masukan Tugas Baru"
                                        value={this.state.catatan} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb3" controlId="status">
                        <Form.Label>Status</Form.Label>
                        <Form.Select aria-label="Default select example" name="status" value={this.state.status} onChange={this.handleChange}>
                            <option value="uncompleted">Uncompleted</option>
                            <option value="completed">Completed</option>
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Modal.Footer>
                </Form>
                </Modal>
            </div>
        )
    }
}