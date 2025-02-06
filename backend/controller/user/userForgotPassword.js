async function userForgotController(req, res) {
    try {
        const { email } = req.body

        if (!email) {
            throw new Error("Please provide Email")
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            throw new Error("User not found!")
        }

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = userForgotController