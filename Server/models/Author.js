const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name: { type: String },
    age:  { type: Number },
})

module.exports = mongoose.model('authors', AuthorSchema)
// authors là tên bảng mà chúng ta sẽ lưu vào mongoDB