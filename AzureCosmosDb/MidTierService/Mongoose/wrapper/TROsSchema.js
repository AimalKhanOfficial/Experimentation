var mongoose = require('mongoose');
module.exports = mongoose.model('TROs', new mongoose.Schema({ id: String, mfeKey: String, someAttr: String}), 'TROs');