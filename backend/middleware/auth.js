import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {

   const token = req.headers.token;
   if (!token) { return res.json({ success: false, message: " Not Authorized login again" }) }

   try {
      const token_decode = jwt.verify(token, process.env.SECRET_KEY)
      req.body.userID = token_decode.id;
      next()

   } catch (e) {
      console.log(e)
      res.json({ success: false, message: e.message })
   }
}


export default authUser;