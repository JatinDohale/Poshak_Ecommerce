import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {

        const { token } = req.headers

        if (!token) { return res.json({ success: false, message: "Unauthorized Login try again " }) }

        const token_decode = jwt.verify(token, process.env.SECRET_KEY)

        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) { return res.json({ success: false, message: "Unauthorized Login try again" }) }

        next()

    } catch (e) {
        console.log(e.message)
        res.json({ success: false, message: e.message })
    }
}

export default adminAuth;