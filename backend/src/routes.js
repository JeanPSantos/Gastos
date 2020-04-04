const express = require('express');

const UserController = require('./controllers/UserController');
const SpendingController = require('./controllers/SpendingController');
const SpendingTypeController = require('./controllers/SpendingTypeController');
const ProfileSpendingTypeController = require('./controllers/ProfileSpendingTypeController');
const ProfileSpendingController = require('./controllers/ProfileSpendingController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.get('/profileSpending', ProfileSpendingController.index);

routes.get('/profileSpendingTypes', ProfileSpendingTypeController.index);

routes.get('/spendingTypes', SpendingTypeController.index);
routes.post('/spendingTypes', SpendingTypeController.create);
routes.delete('/spendingTypes/:id', SpendingTypeController.delete);

routes.get('/spending', SpendingController.index);
routes.post('/spending', SpendingController.create);
//routes.delete('/spending/:id', SpendingController.delete);
 
module.exports = routes;
