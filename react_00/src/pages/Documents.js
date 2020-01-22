import React from 'react'
import axios from 'axios'
import TableData from './components/TableData'
import AddDocument from './components/AddDocument'

class Documents extends React.Component{
    constructor(props){
        super()
        this.props = props
        this.state = {
            data: [],
            newDocument: {
                title: "",
                desc: ""
            }
        }
    }

    getDocuments = () => {
        axios.get('http://localhost:8000/api/data')
        .then(res => {
            this.setState({data: res.data})
        })
        .catch(err => {
        })
    }

    componentDidMount(){
        this.getDocuments()
    }

    onDelete = (id) => {
        console.log(`Got id ${id}`)
        axios.delete(`http://localhost:8000/api/data/${id}`)
        .then(res => {
            this.getDocuments()
        })
        .catch(err => {
            console.log("Failed to delete the document")
        })
    }

    onChange = (evt) => {
        const field = evt.target.name
        const value = evt.target.value
        const {newDocument} = this.state
        newDocument[field] = value
        this.setState({newDocument})
    }

    onSubmit = (evt) => {
        const document = this.state.newDocument
        axios.post("http://localhost:8000/api/data", document)
        .then(res => {
            this.getDocuments()
            this.setState({
                newDocument: {
                    title: '',
                    desc: ''
            }})
        })
        .catch(err => {
            console.log("Error while saving the document")
        })
    }

    render(){
        return(
            <div className='documents'>
                <br />
                    <TableData
                        onDelete={this.onDelete}
                        data={this.state.data}
                    />
                <br/>
                <AddDocument
                    title={this.state.newDocument.title}
                    desc={this.state.newDocument.desc}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }
}

export default Documents