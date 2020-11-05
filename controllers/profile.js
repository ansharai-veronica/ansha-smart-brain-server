const handleProfile = (knex) => (req, res) => {
    const {id} = req.params
    knex.select('*').from('users').where({id}).then(user => {
        if (user.length) {
            res.json(user[0]).statusCode(200)

        } else {
            res.json('Not found').statusCode(400)
        }
    }).catch(() => res.status(400).json('error getting user'))
}

module.exports = {
    handleProfile
}
