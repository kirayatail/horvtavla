var pledgeController = require('./controllers/pledgecontroller');
var paymentmail = require('./controllers/paymentmail');
var registerpayment = require('./controllers/registerpayment');
module.exports = function(app) {

  app.post('/api/pledge', pledgeController.register);

  app.get('/api/confirm/:token', pledgeController.confirm);

  app.get('/api/stats', pledgeController.stats);

  app.get('/api/goals', pledgeController.goals);

  app.get('/api/deadline', pledgeController.deadline);

  app.get('/api/paymentmail', paymentmail);

  app.post('/api/registerpayment', registerpayment);

};
