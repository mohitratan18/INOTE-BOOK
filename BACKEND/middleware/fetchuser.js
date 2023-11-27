const jwt = require('jsonwebtoken');
const secret = 'mohit6317';

const fetchuser = (req,res,next)=>{
    const token = req.header("auth-token");
    if(!token){
        res.status(401).json({error:"please authenticate your auth-token"})
    }
    try {
        const data = jwt.verify(token,secret);
        req.user = data.user;
        next();
    }catch (error) {
        console.error(error.message);
        res.status(500).send("there is an please try again");
      }
}

module.exports = fetchuser;