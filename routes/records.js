
var mongoose = require('mongoose')

const CrateModel = require('../models/crate')

module.exports = app => {

  // Information about all records.
  app.get('/records', (req, res) => {
    req.crateModel
      .find()
      .sort({ created_at: -1 })
      .exec((err, records) => res.json(records))
  })

  // Add a record.
  app.post('/records', (req, res) => {
    const newRecord = new req.recordModel(
      Object.assign({}, req.body, { created_at: Date.now() })
    )
    newRecord.save((err, savedRecord) => {
      res.json(savedRecord)
    })
  })

  // Update a record's information.
  app.put('/records', (req, res) => {
    const idParam = req.webtaskContext.query.id
    req.crateModel.findOne({ _id: idParam }, (err, recordToUpdate) => {
      const updatedRecord = Object.assign(recordToUpdate, req.body)
      updatedRecord.save((err, record) => res.json(record))
    })
  })

  // Delete a record.
  app.delete('/records', (req, res) => {
    const idParam = req.webtaskContext.query.id
    req.crateModel.remove({ _id: idParam }, (err, removedRecord) =>
      res.json(removedRecord)
    )
  })
}
