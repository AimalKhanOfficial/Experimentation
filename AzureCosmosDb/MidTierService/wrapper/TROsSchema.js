var mongoose = require('mongoose');
module.exports = mongoose.model('TROs', new mongoose.Schema({ mfeKey: String}), 'TROs');