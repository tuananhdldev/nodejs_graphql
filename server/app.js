const express = require('express')
const { ApolloServer } = require ('apollo-server-express')
const mongoose = require('mongoose')

const env = require('dotenv')
//WTrH8ILD9ibREkX9
//load schema and resolver
const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')
const mongodataMethod =  require('./data/db')
require('dotenv').config()

//connection mongoDB Atlas
const conenctDB = async()=>{
    try {
        await mongoose.connect(process.env.DB_URI,{
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useNewUrlParser: true
            
        })
        console.log("mongoDB connected");
    } catch (error) {
        console.log(error.message)
       
    }
}

conenctDB()

const server = new ApolloServer(
    {
        typeDefs,
        resolvers,
        context: ()=>({mongodataMethod})
    }
)
const app = express()
server.applyMiddleware({app})
app.listen({ port:4000},()=>{
    console.log(`Server ready at : http://localhost:4000${server.graphqlPath}`);
})