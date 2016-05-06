var mail = require('./backend/lib/mail');

mail.send('imax@chalmers.it', 'test', "Detta testmail skickades som en one-off-körning");
