const bcript = require("bcrypt");

const saltRounds = 10;

const hashPassword=(password)=>{
   const salt = bcript.genSaltSync(saltRounds);
   return bcript.hashSync(password, salt)
}

const comparePassword =(plain, hashed)=>{
  return bcript.compareSync(plain, hashed)
}

module.exports= {hashPassword, comparePassword}