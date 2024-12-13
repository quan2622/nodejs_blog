const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    _id: {type: Number, },
    name: {type: String, maxLenght: 225, require: true},
    description: {type: String, require: true},
    image: {type: String},
    videoID: {type: String, require: true},
    level: {type: String, require: true},
    slug: {type: String, slug: 'name', unique: true},
}, {
    _id: false,
    timestamps: true,
});


// Custom query helper
courseSchema.query.sortAble = function(req) {
    if(req.query.hasOwnProperty('_sort')) {
        const isValidatetype = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
          [req.query.column] : isValidatetype? req.query.type : 'desc'
        });
    }
    return this;
}


// Add plugin
mongoose.plugin(slug);

courseSchema.plugin(AutoIncrement);
courseSchema.plugin(
    mongooseDelete, 
    {deletedAt : true, overrideMethods: 'all' },
)

module.exports = mongoose.model('course', courseSchema);