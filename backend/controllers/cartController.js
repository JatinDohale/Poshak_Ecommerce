import userModal from "../models/userModal.js"


//  Route for add cart to DB
const addTOCart = async (req, res) => {
    try {

        const { userID, itemID, size } = req.body

        const userData = await userModal.findById(userID)
        let cartData = await userData.cartData ? userData.cartData : {};

        if (cartData[itemID]) {
            if (cartData[itemID][size]) {
                cartData[itemID][size] += 1
            } else {
                cartData[itemID][size] = 1
            }
        } else {
            cartData[itemID] = {}
            cartData[itemID][size] = 1
        }

        await userModal.findByIdAndUpdate(userID, { cartData })
        res.json({ success: true, message: " Added to  cart" })


    } catch (e) {
        console.log(e)
        res.json({ success: false, message: e.message })
    }

}


//  route for update Cart
const updateCart = async (req, res) => {
    try {

        const { userID, itemId, size, quantity } = req.body
        const userData = await userModal.findById(userID)

        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity;

        await userModal.findByIdAndUpdate(userID, { cartData })
        res.json({ success: true, message: "cart Updated" })

    } catch (e) {
        console.log(e)
        res.json({ success: true, message: e.message })
    }
}


// route for get cart from DB
const getUserCart = async (req, res) => {

    try {

        const { userID } = req.body;
        const userData = await userModal.findById(userID)

        let cartData = await userData.cartData;
        res.json({ success: true, cartData, message: "cart Updated" })

    } catch (e) {
        console.log(e)
        res.json({ success: true, message: e.message })
    }
}


export { addTOCart, updateCart, getUserCart }
