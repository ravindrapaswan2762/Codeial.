const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/codeial_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro connecting to mongoDB'));

db.on('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;