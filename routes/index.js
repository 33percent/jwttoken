var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
var tokenfor = "";
function authenticator(req,res,next){
if(tokenfor != ""){
  jwt.verify(tokenfor, 'secretfirjwt', function(err, decoded) {
    if(err){
      console.log(err);
      console.log("wrong toke");
      res.send('wrong token');
    } else {
//       var originalDecoded = jwt.decode(tokenfor, {complete: true});
// tokenfor = jwt.refresh(originalDecoded, 3600, "secretfirjwt");
tokenfor = jwt.sign(decoded,'secretfirjwt');
console.log(tokenfor);
      // tokenfor = jwt.refresh(decoded,'secretfirjwt',{expiresIn: '24h'});
      console.log("updatedtoke");
      next();
    }
  });

} else {
  console.log("token generated")
  tokenfor = jwt.sign(req.body,'secretfirjwt');
  console.log(tokenfor);
  next();
}

}
router.post('/submit',authenticator,function(req,res,next){
  res.json(tokenfor);
});
router.get('/all',authenticator,function(req,res,next){
  res.send(tokenfor);
})
module.exports = router;
