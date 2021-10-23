import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

const UpdateProducts = () => {
    const [product, setProduct] = useState({})
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        const url = `http://localhost:9000/products/${id}`;

        fetch(url)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [])
    const onSubmit = ({ name, price, quantity }, e) => {
        const products = { name, price, quantity };
        const url = `http://localhost:9000/products/${id}`;
        fetch(url, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(products),
        }).then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('product is updated');
                    setProduct({})
                    e.target.reset();
                }
            })

    }

    return (
        <div>
            <h1>{product?.name} {product?.price} {product?.quantity}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                <input defaultValue={product?.name || ''}  {...register("name" )} />
                <br />

                <input defaultValue={product?.price || ''}  {...register("price")} />
                <br />
                <input defaultValue={product?.quantity || ''} {...register("quantity")} />
                <br />

                {errors.exampleRequired && <span>This field is required</span>}

                <input type="submit" />
            </form>
        </div>
    );
};

export default UpdateProducts;