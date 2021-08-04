import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from 'react-router-bootstrap';
import { listUsers } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

function UserListPage() {

    const dispatch = useDispatch();

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList


    useEffect(() => {
        dispatch(listUsers());
    }, [dispatch])

    const deleteHandler = (id) => {
        console.log(id)
    } 

    return (
        <div>
            <h1>User List</h1>
            {loading ? (
                <Loader/>
            ): error ? (
                <Message variant='danger'>{error}</Message>
            ): (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user =>(
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.is_admin ? (
                                    <i className='fas fa-check' style={{color:'green'}}></i>
                                ): (
                                    <i className='fas fa-check' style={{color:'red'}}></i>
                                )}</td>

                                <td>
                                    <LinkContainer to={`/admin/user/${user.id}`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user.id)}>
                                            <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default UserListPage
