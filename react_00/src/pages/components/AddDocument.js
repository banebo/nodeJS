import React, { Fragment } from 'react'
import { Button, Label, Input } from 'reactstrap'

const AddDocument = ({title, desc, onChange, onSubmit}) =>
    <Fragment>
        <p>Add new document</p>
            <Label>Title:</Label>
            <Input 
                type='text' 
                name='title' 
                placeholder='Enter Title' 
                value={title}
                onChange={onChange}
                required
            />
            <Label>Description:</Label>
            <Input 
                type='text' 
                name='desc' 
                placeholder='Enter Description' 
                value={desc}
                onChange={onChange}
            />
            <Button 
                color='success' 
                type='submit' 
                onClick={onSubmit}
            >
                Save
            </Button>
    </Fragment>

export default AddDocument