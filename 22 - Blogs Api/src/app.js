const express = require('express');
const { loginValidation } = require('./middlewares');
const { login } = require('./controller/login.controller');
const { userRouter, categoryRouter, blogPostRouter } = require('./routes');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.post('/login', loginValidation, login);
app.use('/user', userRouter);
app.use('/categories', categoryRouter);
app.use('/post', blogPostRouter);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
