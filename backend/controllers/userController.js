// Packages
import isEmail from 'validator/lib/isEmail.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModal from '../models/userModal.js'


const createToken = (id) => { return jwt.sign({ id }, process.env.SECRET_KEY) }


// route for user SignUP
const userSignUp = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        const exist = await userModal.findOne({ email });

        if (exist) { return res.json({ success: false, message: "User already Exist , Try to Login" }) }

        if (!isEmail(email)) { return res.json({ success: false, message: "Enter Valid Email" }) }

        if (password.length < 8) { return res.json({ success: false, message: "Password more than 8 letters" }) }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModal({
            name,
            email,
            password: hashedPassword,
        })
        const user = newUser.save()

        const token = createToken(user._id)
        res.json({ success: true, token })

    } catch (e) {
        console.log(e)
        res.json({ success: false, message: e.message })
    }
}


// route for user login
const userLogin = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await userModal.findOne({ email })

        if (!user) { return res.json({ success: false, message: "User dose not have account" }) }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = createToken(user._id)
            return res.json({ success: true, token })
        } else {
            return res.json({ success: false, message: "Invalid Creditnails" })
        }

    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "Something Wrong Try again later" })
    }
}


// route for Admin login
const adminLogin = async (req, res) => {
    try {

        const { email, password } = await req.body;

        if (email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.SECRET_KEY)
            res.json({ success: true, message: "Login Succsesfull", token })
        }

        res.json({ success: false, message: "invalid Creditnails" })

    } catch (e) {
        console.log(e)
        res.json({ success: false, message: e.message })
    }

}


export { userLogin, userSignUp, adminLogin }