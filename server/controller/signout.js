module.exports = {

    endSession: (req, res) => {
        res.cookie('accessToken', '', {maxAge: 0})
        res.cookie('refreshToken', '', {maxAge: 0})
        return res.sendStatus(200)
    }

}