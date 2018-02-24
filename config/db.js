const mongoose = require('mongoose');

//Map global promises
mongoose.Promise = global.Promise;

mongoose.connect
('mongodb://saif1642:saif1928789@ds147518.mlab.com:47518/vote_counter')
.then(() => console.log('mongodb connected -*-'))
.catch(err => console.log(err));
