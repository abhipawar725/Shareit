import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
try {
    const token = req.cookies.token
    if(!token) return res.status(401).json({message:'Access denied. No token provided.'})
    
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
      req.user = decoded 
    next()
} catch (error) {
    res.status(401).json({message:"Invalid or expired token."})
}
}

export default verifyToken;