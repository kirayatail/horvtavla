var pledgeController = require('./controllers/pledgecontroller');

module.exports = function(app) {

  app.post('/api/pledge', pledgeController.register);

  app.get('/api/confirm/:token', pledgeController.confirm);

  app.get('/api/stats', pledgeController.stats);
};
