import React, { Fragment } from 'react'
import {Table, Button} from 'reactstrap'
import {Link} from 'react-router-dom'


const TableData = ({data, onDelete}) => 
    <Fragment>
        <br />
        <Table bordered>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map(el =>
                        <tr key={el.id}>
                            <td>{el.title}</td>
                            <td>
                                <Link to={`/documents/${el.id}`}>
                                    <Button
                                        color='primary'
                                    >
                                        Preview
                                    </Button>
                                </Link>
                                <Link to={`/documents/edit/${el.id}`}>
                                    <Button 
                                        color='warning'
                                    >
                                        Edit
                                    </Button>
                                </Link>
                                <Button 
                                    color='danger'
                                    onClick={() => onDelete(el.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
    </Fragment>

export default TableData
