const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    privateKeyPassphrase: process.env.PRIVATE_KEY_PASS_PHRASE,
};
  