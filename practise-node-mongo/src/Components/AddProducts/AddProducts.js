
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddProducts = () => {
    // const [user, setUser] = useState({})
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = ({ name, price, quantity },e) => {
   const Users = { name, price, quantity };
    // setUser(Users)

    fetch('http://localhost:9000/products',{
        method:"POST",
        headers : {
            "content-type" : "application/json"
        },
        body:JSON.stringify(Users),
    })
    .then(res=>res.json())
    .then(result=>{
        if(result.insertedId){
            alert('Product is added')
            e.target.reset()
        }
    })
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <input placeholder="Product Name" {...register("name")} />
                <br />

                <input placeholder="Price" {...register("price", { required: true })} />
                <br />
                <input placeholder="product Quantity" {...register("quantity", { required: true })} />
                <br />

                {errors.exampleRequired && <span>This field is required</span>}

                <input type="submit" />
            </form>
        </div>
    );
};

export default AddProducts;