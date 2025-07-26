import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const verifyToken = async (req, res, next) => {
try {
    const token = req.cookies.token
    if(!token) return res.status(401).json({message:'Access denied. No token provided.'})
    
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    const user = await User.findById(decoded.id)
    res.locals.user = user 
    next()
} catch (error) {
    res.status(401).json({message:"Invalid or expired token."})
}
}

export default verifyToken;