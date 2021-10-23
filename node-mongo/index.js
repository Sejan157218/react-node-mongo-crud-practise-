const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;


const app = express();
const port = 9000;


app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://mongodbpractise:<password>@cluster0.57jms.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db("Shop");
        const products = database.collection("products");


        // post product ba add product
        app.post("/products", async (req, res) => {
            const newProducts = req.body;
            const result = await products.insertOne(newProducts);
            res.json(result)
            // res.send('this is run', products)
        })

        // get data ba read data
        app.get("/products", async (req, res) => {
            const cursor = products.find({});
            const results = await cursor.toArray();
            res.send(results)
        })



        // update data
        app.get("/products/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await products.findOne(filter);
            res.send(result);
        })

        // update product
        app.put("/products/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const newUpdate = req.body;
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: newUpdate.name,
                    price: newUpdate.price,
                    quantity: newUpdate.quantity,
                },
            };
            const result = await products.updateOne(filter, updateDoc, options);

            res.json(result);
        })

        app.delete("/products/:id", async (req, res) => {
            const id = req.params.id;
            const deleteItem = { _id: ObjectId(id) }
            const result = await products.deleteOne(deleteItem);
            res.json(result);
        })


    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log('Running Server', port)
})