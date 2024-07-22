const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config({path:__dirname+'/../.env'});

const {MONGODB_USER, MONGODB_PASSWORD} = process.env

const uri = "mongodb+srv://"+MONGODB_USER+":"+MONGODB_PASSWORD+"@cluster0.7r4gxfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function getData(callback) {
  try {
    await client.connect();
    const db = client.db('bookstore');
    await callback(db)
  } catch(error){
   console.log("mongo: "+error)
   client.close();
 
  }
}
module.exports = {getData, ObjectId};