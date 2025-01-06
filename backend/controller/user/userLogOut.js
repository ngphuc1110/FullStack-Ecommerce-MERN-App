async function userLogOut(req, res) {
    try {
        res.clearCookie("token")

        res.json({
            message: "Logout Successfully!",
            error: false,
            success: true,
            data: []
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = userLogOut