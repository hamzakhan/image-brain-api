const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: "13cc32a6ab304cac9e6511788678ca04"
  })

const handleApiCall = () => (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json("Error accessing API"));
}

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where({id})
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('Unable to retrieve entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}