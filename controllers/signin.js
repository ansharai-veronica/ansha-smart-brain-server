const  handleSignin = (bcrypt,knex) => (req, res,) => {
    const {email, password} = req.body

    if(!email || !password){
        return  res.status(400).json('incorrect form submission')
    }else{
        knex
            .select('email', 'hash').from('login')
            .where('email', '=', email)
            .then(data => {
                console.log(data)
                const {hash} = data[0]

                bcrypt.compare(password, hash, function (err, result) {
                    console.log(result)
                    if (result) {
                        return knex
                            .select('*')
                            .from('users')
                            .where('email', '=', email)
                            .then(user => res.status(200).json(user[0]))
                            .catch(err => res.status(400).json('Error loggin in'))
                    } else {
                        res.status(400).json('Wrong credentials')
                    }

                })

            }).catch(err => res.status(400).json('Wrong credentials'))
    }


}

module.exports = {
    handleSignin
}
