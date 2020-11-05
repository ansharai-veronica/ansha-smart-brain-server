const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: '8f2e5f670c4743d5ae1f693e688c8de7'
})


const handleApiCall = (req, res) => {
    app.models.predict(
        'c0c0ac362b03416da06ab3fa36fb58e3', req.body.input
    ).then(data => res.json(data)).catch(err => res.status(400).json('Unable to call the api'))
}


const handleImage = (knex) => (req, res) => {
    const {id} = req.body
    knex('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.status(200).json(entries[0])).catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}
