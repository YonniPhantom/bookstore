const express = require("express");
const auth = require("../middleware/authenticate")
const {getData, ObjectId, client} = require("../models/mongo-client");
const router = new express.Router();

router.get('/libros', async (req, res)=>{
  let data
  let A_res;
  try{
   A_res = await axios.get("https://www.googleapis.com/books/v1/volumes?q=subject:Science+Fiction&filter=free-ebooks&printType=books&key="+GBOOK_API_KEY)
   
   if (A_res.status >= 200 && A_res.status < 300) {
        
    A_res =  map(A_res.data.items,(item)=>{
                         console.log(item.volumeInfo)
                   
             return item.volumeInfo
    })
  } 
   data= await getData(async(db)=>{
  const collection = db.collection('usuarios');
  const arr = await collection.find().toArray();
 return arr;
   });}catch(error){
      console.log(error)
   }finally{
      await client.close();
   }

   res.status(200).send([...data ]);
})

.post("/libro/leido",(req, res)=>{
    let userid= req.status
    let {bookid} = req.body
       getData( async (db)=>{
        let found = await db.collection('reviews').findOne({book_id: bookid, user_id:new ObjectId(userid)})
          if(!found){
            await db.collection('reviews').insertOne({book_id:book, user_id:new ObjectId(userid), leido:true })
          }
       })

    res.status(200).send({})
})
.put("/libro/rating",async (req, res)=>{
   
    const session = client.startSession();

        // Define the transaction options
        const transactionOptions = {
          readPreference: 'primary',
          readConcern: { level: 'local' },
          writeConcern: { w: 'majority' }
        };

        const transactionResults = await session.withTransaction(async () => {
             
            // Example operations within the transaction
            await db.collection('reviews').updateOne({ _id: userId }, { $set: { balance: newBalance } }, { session });
            await db.collection('ratings').updateOne({ userId, reviewText, rating }, { session });
            await db.collection('usuarios').updateOne()
      
          }, transactionOptions);
      
          if (transactionResults) {
            console.log('Transaction successfully committed.');
          } else {
            console.log('Transaction intentionally aborted.');
          }
})
.delete("/libro/leido", (req, res)=>{
     let userid= req.status
     let {reviewId}= req.body
      
     getData( async (db)=>{
        await db.collection('reviews').deleteOne({_id: new ObjectId(reviewId), user_id:new ObjectId(userid)})
     })
    res.status(200).send({})
})


module.exports = router;