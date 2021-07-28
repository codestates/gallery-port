module.exports = {

    endSession: (req, res) => {
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })
        
        return res.status(200).send('tough cookie')
    }

}