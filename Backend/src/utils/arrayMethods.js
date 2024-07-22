const map = (callback)=>{
   let result =[];
   for(let i=0; i < this.length; i++){
       result.push(callback(this[i], i, this))
   }
   return result;
}
// add map to Array.prototype after import
module.exports= {map}


/*
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
     */