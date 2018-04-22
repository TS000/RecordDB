var mongoose = require('mongoose')

// Grab our Crate
const CrateSchema = require('../models/Crate')

module.exports = {

    // In order to make sure we are efficient, set up connects and disconnects
    connectDisconnect: (req, res, next) => {
        const connection = mongoose.createConnection(
            req.webtaskContext.secrets.MONGO_URL
        )

        req.crateModel = connection.model('Crate', CrateSchema)
        req.on('end', () => {
            mongoose.connection.close()
        })

        next()
    }
}
