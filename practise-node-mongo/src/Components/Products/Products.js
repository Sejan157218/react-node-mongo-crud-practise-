import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:9000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    const deleteItem = id => {
        const proceed = window.confirm('Are you sure to delete this')
        if (proceed) {
            fetch(`http://localhost:9000/products/${id}`, {
                method: 'DELETE',
            }).then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const poductFilter = products.filter(pd => pd._id !== id);
                        setProducts(poductFilter)
                    }
                })
        }
    }
    return (
        <div>
            <Row xs={1} md={2} className="g-4">
                {products.map(pd => (
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Product name : {pd?.name}</Card.Title>
                                <Card.Title>Product price : {pd?.price}</Card.Title>
                                <Card.Title>Product quantity : {pd?.quantity}</Card.Title>
                                <Link to={`/product/${pd?._id}`}> <button>Update</button> </Link>
                                <button onClick={() => deleteItem(pd?._id)}>Delete</button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Products;