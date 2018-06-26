const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { 
  makeExecutableSchema, 
  addMockFunctionsToSchema, 
  mergeSchemas 
} = require('graphql-tools');
const cors = require('cors')

const usersResolver = require('./graphQL/users/users.resolver.js')
// console.log('-->', usersResolver)
const roomsResolver = require('./graphQL/rooms/rooms.resolver.js')
// console.log('-->', roomsResolver)
const usersTypeDef = fs.readFileSync('./graphQL/users/users.gql', 'utf8');
// console.log('===>', usersTypeDef)
const roomsTypeDef = fs.readFileSync('./graphQL/rooms/rooms.gql', 'utf8');
// console.log('===>', roomsTypeDef)

// // Single user schema
// const userSchema = makeExecutableSchema({
//   typeDefs: usersTypeDef,
//   resolvers: usersResolver
// })

const userSchema = makeExecutableSchema({
  typeDefs: usersTypeDef
})

addMockFunctionsToSchema({ schema: userSchema })

const roomSchema = makeExecutableSchema({
  typeDefs: roomsTypeDef
})

addMockFunctionsToSchema({ schema: roomSchema })

const mergedSchema = mergeSchemas({
  schemas: [
    userSchema,
    roomSchema,
  ],
  resolvers: [
    usersResolver,
    roomsResolver
  ]
})

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

//GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: mergedSchema }) )

//GraphQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
