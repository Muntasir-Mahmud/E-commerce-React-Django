import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserDetails, updateUser } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { USER_UPDATE_RESET } from '../constants/userConstants';

function UserEditPage({ match, history }) {

    const userId = match.params.id;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails
    
    const userUpdate = useSelector(state => state.userUpdate)
    const { loading:loadingUpdate, error:errorUpdate, successUpdate } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({type: USER_UPDATE_RESET})
            history.push('/admin/userList')
        } else{
            if(!user.name || user.id !== Number(userId)) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

        
    }, [dispatch, history, successUpdate, user.email, user.id, user.isAdmin, user.name, userId])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({id:user.id, name, email, isAdmin}))

    }
    return (
        <div>
            <Link to='/admin/userList'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading? <Loader/> : error? <Message variant='danger'>{error}</Message> 
                : (
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='isadmin'>
                            <Form.Check
                                type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            >
                            </Form.Check>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                 )}
            </FormContainer>
        </div>
    )
}

export default UserEditPage;
