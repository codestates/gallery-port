const bcrypt = require('bcryptjs');

bcrypt.genSalt().then(salt => {
    bcrypt.hash('password', salt).then(hash => {
        console.log(salt)
        console.log(hash)
        bcrypt.compare('password', hash).then(result => console.log(result))
    })
})

