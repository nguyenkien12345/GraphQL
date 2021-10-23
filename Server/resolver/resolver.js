// resolvers sẽ trả lại dữ liệu hiển thị ra cho người dùng

const resolvers = {
    // Truy vấn dữ liệu
    Query: {
        // Khi mà chúng ta gọi 1 hàm bất đồng bộ lên mà có trả lại giá trị thì chúng ta phải dùng async vs await luôn
        books: async (parent, args, context) => await context.mongoDataMethods.getAllBooks(),
        book:  async (parent, args, context) => await context.mongoDataMethods.getBookById(args.id),                            
        authors: async (parent, args, context) => await context.mongoDataMethods.getAllAuthors(),
        author:  async (parent, args, context) => await context.mongoDataMethods.getAuthorById(args.id),                        
    },
    Book:   {   // Mỗi lần nhìn thấy Type là Book và field là author => Vào đây xử lý
        // Debug: console.log(parent)
        author: async (parent, args, context) => await context.mongoDataMethods.getAuthorById(parent.authorId),         // Trả về dữ liệu cho field author trong tybe Book    
    },
    Author: { // Mỗi lần nhìn thấy Type là Author và field là books => Vào đây xử lý
        // Debug: console.log(parent)
        books:  async (parent, args, context) =>  await context.mongoDataMethods.getAllBooks({authorId: parent.id})     // Trả về dữ liệu cho field books trong tybe Author. // authorId: parent.id lấy ra những cuốn sách có authorId =  parent.id
    },

    // Ghi dữ liệu
    Mutation: {
        // Muốn nch với database phải dùng async await
        createAuthor: async (parent, args, context) => await context.mongoDataMethods.createAuthor(args), 
        createBook:   async (parent, args, context) => await context.mongoDataMethods.createBook(args),     
    }
}

module.exports = resolvers;

// Phải lấy Type trước rồi mới lấy field

// Lấy ra cái Type. schema khai báo sao phải lấy ik chang. 

// Lấy ra cái field (trường). schema khai báo sao phải lấy ik chang.

// args: nhận về các tham số được định nghĩa bên schema. 

// Tham số id khi được truyền thông qua graphSql Server thì luôn bị chuyển thành kiểu string. Nên cần ép kiểu để không bị lỗi. (Ép hết về string)

// args trong createAuthor sẽ như sau args {id, name, age}. 
// Debug console.log(args) để kiểm tra. Nó sẽ được add vào so sánh vs Type Author, 3 thằng id, name, age đều có hết thiếu mỗi filed books mà
// filed books nằm trong Type Author nên nó sẽ chui vào Type Author, field books để xử lý

// args trả về toàn bộ dữ liệu mà người dùng thêm vào

// Khi chưa kết nối mongooseDB 

// ----------------------------------------------------------------------------------------------------------------------------------------
    // const { books, authors } = require("../data/static");
    // // Truy vấn dữ liệu
    // Query: {
    //     books: () => books,
    //     book: (parent, args) => books.find(book => book.id.toString()  === args.id.toString()),  
    //     authors: () => authors,
    //     author: (parent, args) => authors.find(author => author.id.toString() === args.id.toString())
    // },
    // Book: {  // Mỗi lần nhìn thấy Type là Book và field là author => Vào đây xử lý
    //     // Debug: console.log(parent)
    //     author: (parent, args) => (authors.find(author => author.id.toString() === parent.authorId.toString()))  // Trả về dữ liệu cho field author trong tybe Book    
    // },
    // Author: { // Mỗi lần nhìn thấy Type là Author và field là books => Vào đây xử lý
    //     // Debug: console.log(parent)
    //     books: (parent, args) => (books.filter(book => book.authorId.toString() === parent.id.toString()))      // Trả về dữ liệu cho field books trong tybe Author
    // },

    // // Ghi dữ liệu
    // Mutation: {
    //     // Muốn nch với database phải dùng async await
    //     createAuthor: async (parent, args) => {
    //         const newAuthor = new Author(args);
    //         return await newAuthor.save();
    //     }, 
    //     createBook: async (parent, args) => {
    //         const newBook = new Book(args);
    //         return await newBook.save();
    //     }
    // }
// ----------------------------------------------------------------------------------------------------------------------------------------
