const { connect, connection} = require('mongoose');

connect('mongodb://localhost/socialMediadb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;
