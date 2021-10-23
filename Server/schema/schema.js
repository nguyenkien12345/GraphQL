// schema định dạng cấu trúc, sườn của cơ sở dữ liệu 

const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        id: ID!
        name: String
        genre: String
        author: Author
    }

    type Author {
        id: ID!
        name: String
        age: Int
        books: [Book]
    }

    # ROOT TYPE (Gốc của sơ đồ (điểm bắt đầu). 

    # TYPE truy xuất dữ liệu từ data phải luôn là Query không được thay thế bằng từ khác.
    type Query {
        books: [Book]                   # Kết quả trả về là 1 mảng Book
        book (id: ID): Book             # Kết quả trả về là 1 đối tượng Book
        authors: [Author]               # Kết quả trả về là 1 mảng Author
        author (id: ID): Author         # Kết quả trả về là 1 đối tượng Author
    }

    # Type ghi dữ liệu vào data phải luôn là Mutation không được thay thế bằng từ khác.
    type Mutation {
        createAuthor(name: String, age: Int): Author                        # Kết quả trả về là 1 đối tượng Author
        createBook(name: String, genre: String, authorId: ID!): Book        # Kết quả trả về là 1 đối tượng Book
    }
`

module.exports = typeDefs;

// 1 cuốn sách chỉ thuộc về 1 tác giả
// 1 tác giả có thể có nhiều cuốn sách