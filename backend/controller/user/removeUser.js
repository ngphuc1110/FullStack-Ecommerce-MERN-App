const userModel = require("../../models/userModel")

async function removeUser(req, res) {
    try {

        const userId = req.body._id
        console.log("_id", req.body._id)

        const removeUser = await userModel.deleteOne({ _id: userId })

        res.json({
            data: removeUser,
            message: "User Remove Successfully!!!",
            error: false,
            success: true
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = removeUser