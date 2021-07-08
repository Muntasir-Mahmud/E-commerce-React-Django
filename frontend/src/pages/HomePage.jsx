import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Product from '../components/Product';

function HomePage() {
    
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList) // productList from store.js which will call productListReducer
    const { loading, products, error } = productList

    useEffect(()=> {
        dispatch(listProducts())

    }, [dispatch])
    
    return (
        <div>
            <h1>Latest products</h1>
            {loading ? <Loader/>
                : error ? <h3>{error}</h3>
                : <Row>
                    {products.map(product =>(
                        <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            }
        </div>
    )
}

export default HomePage
