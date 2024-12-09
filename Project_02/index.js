const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const bookRoutes = require('./routes/books');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/users');

const app = express();
app.use(bodyParser.json());


app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes); 
app.use('/api/users', userRoutes);


sequelize.sync({ force: true }).then(() => {
  console.log('Baza danych zsynchronizowana');
  app.listen(3000, () => console.log('Serwer działa'));
})