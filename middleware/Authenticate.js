const jwt = require("jsonwebtoken");

const Authenticate = (req,res,next)=>{
    const token = req.headers.authorization;
    if(token){
        const decoded = jwt.verify(token, "masai");
        if(decoded){
            const userId = decoded.userID;
        req.body.userID = userId;
        next()
        }
        else{
            res.send({"msg":"Please Login First"})
        }
    }
    else{
        res.send({"msg":"Please Login First"})
    }
}

module.exports = {Authenticate}