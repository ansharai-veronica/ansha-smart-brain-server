const handleRegister = (bcrypt, knex) => (req, res) => {
    const saltRounds = 10
    const {name, password, email} = req.body
    if (!email || !password || !name) {
        return res.status(400).json('Incorrect form submission')
    } else {

        bcrypt.hash(password, saltRounds, function (err, hash) {
            knex.transaction(trx => {
                trx.insert({
                    hash,
                    email
                })
                    .into('login')
                    .returning('email')
                    .then(logEmail => {
                        return trx('users').returning('*').insert({
                            email: logEmail[0],
                            name,
                            joined: new Date()
                        }).then(u => {
                            res.json(u[0])
                        }).catch(err => res.status(400).json('Unable to register'))
                    }).then(trx.commit).catch(trx.rollback)
            })
        })
    }

}
module.exports = {
    handleRegister
}
