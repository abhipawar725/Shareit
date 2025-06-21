import jwt from "jsonwebtoken"

const verifyToken = async (req, res, next) => {
   const token = req.cookies.token
   if(!token) return res.status(401).json({message: "Access denied"})

    try {
       const decoded = await jwt.verify(token, process.env.JWT_SECRET)
       req.user = decoded
       next()      
    } catch (error) {
        return res.status(500).json({message: "no token provided"})
    }
}

export default verifyToken