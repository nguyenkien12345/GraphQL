const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    name:  { type: String },
    genre: { type: String },
    authorId: { type: String }
})

module.exports = mongoose.model('books', BookSchema)
// books là tên bảng mà chúng ta sẽ lưu vào mongoDB 