module.exports = {
    mutipleMogooseToObject: function (mogooses) {
        return mogooses.map(mongoose => mongoose.toObject());
    }, mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
};