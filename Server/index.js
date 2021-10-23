const express = require('express');

const { ApolloServer } = require('apollo-server-express');

const mongoose = require('mongoose');

// Load schema & resolver
const typeDefs  = require('./schema/schema');         // Phải đặt tên là typeDefs để tránh bị lỗi
const resolvers = require('./resolver/resolver');     // Phải đặt tên là resolvers để tránh bị lỗi

// Load db methods of MongoDB
const mongoDataMethods = require('./data/db');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ mongoDataMethods })             // context này là 1 cái hàm và nó sẽ trả lại những cái gì mà chúng ta có thể truy cập được. Lúc này file resolver có thể nhận được thông qua tham số context
})

// Connect to MongoDb (Lưu ý đường dẫn kết nối MongoDB phải sửa lại 2 thứ 1 là password (nguyentrungkien) 2 là tên database (GraphQL))
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://nguyentrungkien:nguyentrungkien@graphql.k5ao9.mongodb.net/GraphQL?retryWrites=true&w=majority', {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('MongoDB connected')
    }
    catch (error){
        console.log(error.message);
        process.exit(1);                                // Kết thúc chương trình hoàn toàn 
    }
}

connectDB();

// Khởi tạo app
const app = express();

const startup = async () => {
    await server.start();
    server.applyMiddleware({ app });
    return app;
}

startup();

app.listen({ port: 4000 }, () => {
    console.log(`Server is ready at http://localhost:4000${server.graphqlPath}`) // server.graphqlPath chính là /graphql 
})