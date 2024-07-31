const map = (callback)=>{
   let result =[];
   for(let i=0; i < this.length; i++){
       result.push(callback(this[i], i, this))
   }
   return result;
}
// add map to Array.prototype after import
module.exports= {map}


