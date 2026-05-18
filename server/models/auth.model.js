const mongoose = require('mongoose');
const crypto = require('crypto');
// user schema
const userScheama = new mongoose.Schema(
  {
    foto: {
      type: String,
      trim: true,
      default: "",
    },
    tipostd: {
      type: String,
      trim: true,
      default: "",
    },
    ciclo: {
      type: String,
      trim: true,
      default: "",
    },
    mencion: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    hashed_password: {
      type: String,
      default: "",
    },
    rol: {
      type: String,
      default: "subscriber",
    },
    ip: {
      type: {},
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

//virtual password
userScheama
  .virtual('_password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods
userScheama.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto.createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  }
};

module.exports = mongoose.model('User', userScheama);


{/*
  // Node.js program to demonstrate the
// crypto.privateDecrypt() method

// Including crypto and fs module
const crypto = require('crypto');
const fs = require("fs");

// Using a function generateKeyFiles
function generateKeyFiles() {

    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 530,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: ''
        }
    });

    // Creating public and private key file
    fs.writeFileSync("public_key", keyPair.publicKey);
    fs.writeFileSync("private_key", keyPair.privateKey);
}

// Generate keys
generateKeyFiles();

// Creating a function to encrypt string
function encryptString(plaintext, publicKeyFile) {
    const publicKey = fs.readFileSync(publicKeyFile, "utf8");

    // publicEncrypt() method with its parameters
    const encrypted = crypto.publicEncrypt(
        publicKey, Buffer.from(plaintext));

    return encrypted.toString("base64");
}

// Creating a function to decrypt string
function decryptString(ciphertext, privateKeyFile) {
    const privateKey = fs.readFileSync(privateKeyFile, "utf8");

    // privateDecrypt() method with its parameters
    const decrypted = crypto.privateDecrypt(
        {
            key: privateKey,
            passphrase: '',
        },
        Buffer.from(ciphertext, "base64")
    );

    return decrypted.toString("utf8");
}

// Defining a text to be encrypted
const plainText = "Geeks!";

// Defining encrypted text
const encrypted = encryptString(plainText, "./public_key");

// Prints plain text
console.log("Plaintext:", plainText);
console.log();

// Prints buffer of encrypted content
console.log("Encrypted Text: ", encrypted);
console.log();

// Prints buffer of decrypted content
console.log("Decrypted Text: ",
    decryptString(encrypted, "private_key"));

  */}