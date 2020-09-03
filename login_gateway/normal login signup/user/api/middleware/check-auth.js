const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    try {
        //const token = req.headers.authorization.split(" ")[1];
        const token = req.body.token;
        const decoded = jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
            if (err) {
              
                err = {
                  name: 'JsonWebTokenError',
                  message: 'jwt malformed'
                }
              res.status(401).json(err)
            }
            else{
                req.userData = decoded;
                next();
            }
          });
        
    }
    catch (error) {
        return res.status(401).json({
            message: "auth failed"
        })
    }
};