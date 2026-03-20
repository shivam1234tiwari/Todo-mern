import jwt from 'jsonwebtoken'
const isAuth=async(req,res,next)=>{
    try{
        const token=req.cookies.token
        if(!token){
            res.status(401).json({
                message:'Unauthorized',
                success:false
            })
        }
        const decode=await jwt.verify(token,process.env.JWT_SECRET);
        if(!decode){
            res.status(401).json({
                success:false,
                message:'invalid token'
            })
        }
        req.id=decode.userId
        next();
    }catch(error){
        res.status(401).json({
                success:false,
                message:'failed'
            })
    }
}
export  default isAuth;