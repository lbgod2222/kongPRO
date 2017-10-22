const express = require('express');

const app = express();

// user案例
app.use('/user', express.static('data/user/user.json'));
// user_market案例
app.use('/user/market', express.static('data/shares/shares.json'));
// user_tradeLog案例
app.use('/user/transition', express.static('data/transition/transition.json'));
// user_invote案例
app.use('/user/myInvote', express.static('data/myInvote/myInvote.json'));
// user_init案例
app.use('/user/myInit', express.static('data/myInit/myInit.json'));

const server = app.listen(3456, function(){
  console.log('"Mock server is running at port 3456"');
});

