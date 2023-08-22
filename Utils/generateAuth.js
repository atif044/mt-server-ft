const jwt=require('jsonwebtoken')
const generateAuth=(data)=>{
    const token=jwt.sign(data,process.env.JWT_SECRET,{expiresIn:'1d'});
    return token;
}
module.exports=generateAuth