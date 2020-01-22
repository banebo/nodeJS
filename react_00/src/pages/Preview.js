import React, { Fragment } from 'react'
import {Spinner} from 'reactstrap'
import axios from 'axios'

class Preview extends React.Component {
    constructor(props){
        super()
        this.props = props
        this.state = {
            document: {
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

    render(){
        if(!this.state.isLoaded)
            return(
                <Fragment>
                    Loading data...  <Spinner color='success' size='sm'/>
                </Fragment>
            )

        return(
            <div>
                <br />
                <h1>{this.state.document.title}</h1>
                <br />
                <br />
                <p>{this.state.document.desc}</p>
            </div>
        )
    }
}

export default Preview