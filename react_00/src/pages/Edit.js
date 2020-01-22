import React from 'react'
import axios from 'axios'
import {Button, Input, Spinner} from 'reactstrap'

class Edit extends React.Component{
    constructor(props){
        super()
        this.props = props
        this.state = {
            document: {
                id: '',
                title: '',
                desc: '',
            },
            isLoaded: false
        }
    }

    componentDidMount(){
        const id = this.props.id
        axios.get(`http://localhost:8000/api/data/${id}`)
        .then(res => {
            this.setState({
                document: res.data[0],
                isLoaded: true
            })
        })
    }

    onChange = (evt) => {
        const field = evt.target.name
        const value = evt.target.value
        const {document} = this.state
        document[field] = value
        this.setState({document})
    }

    save = (evt) => {
        const {document} = this.state
        axios.put('http://localhost:8000/api/data/', document)
    }

    render(){
        if(!this.state.isLoaded)
            return(
                <div>
                    Loading... <Spinner color='success' size='sm'/>
                </div>
            )

        return(
            <div>
                <br />
                <Input
                    type='text'
                    placeholder='Enter title'
                    name='title'
                    value={this.state.document.title}
                    onChange={this.onChange}
                />
                <br />
                <Input
                    type='text'
                    placeholder='Enter description'
                    name='desc'
                    value={this.state.document.desc}
                    onChange={this.onChange}
                />
                <Button
                    color='success'
                    onClick={this.save}
                >
                    Save
                </Button>
            </div>
        )
    }
}

export default Edit