const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello ITD Dev')
})

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})

const {MongoClient, ObjectId} = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017';

// const connectDB = async() => {
//     try {
//         const client = new MongoClient(uri);
//         await client.connect();
//         console.log('MongoDB is now conneted.')

//     } catch (error) {
//         console.log(error);
//         process.exit(1);
//     }
// }

// connectDB();

app.get('/slist', async(req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    // const objects = await client.db('mydb').collection('HA_predict').find({}).sort({"GPA": -1}).limit(10).project({_id:0}).toArray();
    const objects = await client.db('mydb').collection('HA_predict').find({}).toArray();
    await client.close();
    res.status(200).send(objects);

})

app.post('/slist/create', async(req, res) => {
    const object = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('HA_predict').insertOne({
        "age": object['age'],
        "sex": object['sex'],
        "cp": object['cp'],
        "trestbps": object['trestbps'],
        "chol": object['chol'],
        "fbs": object['fbs'],
        "restecg": object['restecg'],
        "thalach": object['thalach'],
        "exang": object["exang"],
        "oldpeak": object["oldpeak"],
        "slope" : object["slope"],
        "ca": object["ca"],
        "thal": object["thal"],
        "num" : object["num"]
    });

    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object is created",
        "object": object['_id']
    })
})

app.put('/slist/update', async(req, res) => {
    const object = req.body;
    const id = object._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('HA_predict').updateOne({'_id': ObjectId(id)}, 
    {"$set": {
        "age": object['age'],
        "sex": object['sex'],
        "cp": object['cp'],
        "trestbps": object['trestbps'],
        "chol": object['chol'],
        "fbs": object['fbs'],
        "restecg": object['restecg'],
        "thalach": object['thalach'],
        "exang": object["exang"],
        "oldpeak": object["oldpeak"],
        "slope" : object["slope"],
        "ca": object["ca"],
        "thal": object["thal"],
        "num" : object["num"]
    }});
    await client.close();
    res.status(200).send({
        'status': "ok",
        'message': "Object with ID "+id+" is updated.",
        'object': object
    });
})

app.delete('/slist/delete', async(req, res) => {
    const id = req.body._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('HA_predict').deleteOne({"_id": ObjectId(id)});
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object with ID"+ id + " is deleted."
    });
})


app.get('/slist/age/:searchText', async(req, res) => {
        const { params } = req;
        const searchText = params.searchText
        const client = new MongoClient(uri);
        await client.connect();
        const objects = await client.db('mydb').collection('HA_predict').find({ $text: {$search: searchText } }).sort({ "Date received": -1 }).limit(5).toArray();
        await client.close();
        res.status(200).send({
          "status": "ok",
          "searchText": searchText,
          "Complaint": objects
        }); 
      })

app.get('/slist/:id', async(req, res) => {
        const id = req.params.id;
        const client = new MongoClient(uri);
        await client.connect();
        const object = await client.db('mydb').collection('HA_predict').findOne({ "_id": ObjectId(id) });
        await client.close();
        res.status(200).send({
            "status": "ok",
            "ID": id,
            "Complaint": object
        });
    })