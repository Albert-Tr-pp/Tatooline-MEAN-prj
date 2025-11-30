// ----------------------------- REQUIRE -----------------------------
const mongoose = require('mongoose');

// let dbURI = 'mongodb+srv://Albert:A12345A@cluster0.12zxlhp.mongodb.net/Tatooline?retryWrites=true&w=majority';

const dbURI = process.env.MONGODB_URI;
if (!dbURI) {
  throw new Error('MONGODB_URI is not set in environment (.env)');
}

//register models
require('./planets');
require('./users');

// try {
//   mongoose.connect(
//     dbURI,
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   ).then(
//     () => { console.log(" Mongoose is connected") },
//     err => { console.log(err) }
//   );
// }
// catch (e) {
//   console.log("could not connect");
// }
// require('./planets');
// require('./users');

mongoose.connect(dbURI)
  .then(() => console.log('Mongoose is connected'))
  .catch(err => console.log('Mongoose connection error:', err));

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close( () => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

// For nodemon restarts                                 
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// For app termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

// For Heroku app termination
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});
