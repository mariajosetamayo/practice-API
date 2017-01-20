var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var model = require('./models');
var friendList = model.createFriendList();

friendList.addFriend('Maria');
friendList.addFriend('Ana');
friendList.addFriend('Monica');


app.get('/friends', function (req, res) {
  res.json(friendList.friends);
});

app.get('/friends/:id', function (req, res) {
  var chosenFriendId = Number(req.params.id)
  res.status(200).json(friendList.getFriendById(chosenFriendId));
});

app.post('/friends', jsonParser, function(req, res){
  // perfecto
  if (!('name' in req.body)){
    return res.sendStatus(400);
  }
  var newFriend = friendList.addFriend(req.body.name);
  res.status(200).json(newFriend);
});

app.put('/friends', jsonParser, function(req, res){
  if(req.body.id === ''){
    return res.sendStatus(400);
  }
  console.log('this is the request', req.body)
  res.status(200).json(friendList.update(req.body));
});

app.delete('/friends/:id', function(req, res){
  var chosenFriendId = Number(req.params.id);
  var friend = friendList.delete(chosenFriendId);
  if (friend){
    return res.status(200).json(friend);
  }
  return res.sendStatus(404);
})

// listen for requests 
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
