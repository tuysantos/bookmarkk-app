var express = require('express');
const cors = require('cors');
var express_graphql = require('express-graphql').graphqlHTTP;
var { buildSchema } = require('graphql');
var uuid = require('uuid');

function getGuid() {
    return uuid.v4();
}

var schema = buildSchema(`
    type Query {
        bookMark(id: String!): BookMark
        bookMarks: [BookMark]
    },
    type BookMark {
        id: String
        name: String
        url: String
        group: Group
    },
    enum Group {
        WORK
        LEISURE
        PERSONAL
        RESEARCH
    },
    type Mutation {
        addBookMark(name: String!, url: String!, group: Group!): BookMark
        updateBookMark(id: String!, name: String!, url: String!, group: Group!): Boolean
        deleteBookMark(id: String!): Boolean
    }
`);


var bookMarksData = [
    {
        id: '24358ef3-9be2-40cc-8593-9f0dc2186663',
        name: 'The Complete Node.js Developer Course',
        url: 'https://codingthesmartway.com/courses/nodejs/',
        group: 'WORK'
    },
    {
        id: '190be244-c022-4ab3-bd0c-1d0708a9dec8',
        name: 'Node.js, Express & MongoDB Dev to Deployment',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/',
        group: 'WORK'
    },
    {
        id: '808be244-c045-4ab3-bd0c-1d0708a9dec8',
        name: 'JavaScript: Understanding The Weird Parts',
        url: 'https://codingthesmartway.com/courses/understand-javascript/',
        group: 'RESEARCH'
    }
];

var getBookMark = (args) => { 
    return bookMarksData.find(bookMark => bookMark.id === args.id);
}

var getBookMarks = () => { 
    return bookMarksData;
}

var addBookMark = (args) => {
    const bookMark = {
        id: getGuid(),
        name: args.name,
        url: args.url,
        group: args.group
    }
    bookMarksData.push(bookMark);
    return bookMark;
}

var updateBookMark = (args) => {
    const exist = bookMarksData.find(bookMark => bookMark.id === args.id);
    if(exist) {
        const temp = bookMarksData;
        bookMarksData = [];
        temp.forEach(bookMark => {
            bookMark.id !== args.id ? bookMarksData.push(bookMark) : bookMarksData.push(args);
        });
        return true;
    } else {
        return false;
    }
    
}

var deleteBookMark = (args) => {
    const exist = bookMarksData.find(bookMark => bookMark.id === args.id);
    if(exist) {
        const temp = bookMarksData.filter(bookMark => bookMark.id !== args.id);
        if(temp) {
            bookMarksData = [];
            temp.forEach(item => bookMarksData.push(item))
            return true;
        } else {
            return false;
        }
    } else {
        return false
    }
    
}


var root = {
    bookMark: getBookMark,
    bookMarks: getBookMarks,
    addBookMark: addBookMark,
    updateBookMark: updateBookMark,
    deleteBookMark: deleteBookMark
};

const app = express().use(cors());
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4201, () => console.log('Express GraphQL Server Now Running On localhost:4201/graphql'));