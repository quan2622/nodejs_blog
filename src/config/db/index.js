const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

async function Connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/blog-f8_education_dev');
        console.log('Connect successfully');
    } catch (error) {
        console.log('Connect failure');
    }
}

module.exports = {Connect};
