const Author = require('../models/Author');
const Book   = require('../models/Book');

const mongoDataMethods = {
    // Làm việc với database phải luôn dùng bất đồng bộ async wait

    getAllBooks: async (condition = null) => condition === null ? await Book.find() : await Book.find(condition), // Nếu điều kiện là null lấy ra toàn bộ các cuốn sách. Ngược lại lấy ra những cuốn sách theo điều kiện chỉ định

    getBookById: async (id) => await Book.findById(id),       

    getAllAuthors: async () => await Author.find(),

    getAuthorById: async (id) => await Author.findById(id),   

    createAuthor: async (args) => {
        const newAuthor = new Author(args);                 
        return await newAuthor.save();
    },

    createBook: async (args) => {
        const newBook = new Book(args);                     
        return await newBook.save();
    }
    
}

module.exports = mongoDataMethods