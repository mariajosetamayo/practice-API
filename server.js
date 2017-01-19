
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Friends = require('./models');

var friendList = Friends.friendList;
var getFriendIdIndex = Friends.getFriendIdIndex;
var friendToUpdate = Friends.friendToUpdate;
var friendToDelete = Friends.friendToDelete;


app.get('/friends', function (req, res) {
  res.json(friendList.friends);
});

app.get('/friends/:id', function (req, res) {
  var chosenFriendId = Number(req.params.id)
  var chosenFriend = getFriendIdIndex(chosenFriendId);

  res.status(200).json(friendList.friends[chosenFriend]);
});

app.post('/friends', jsonParser, function(req, res){
  if (!('name' in req.body)){
    return res.sendStatus(400);
  }
  
  var newFriend = friendList.addFriend(req.body.name);
  
  res.status(200).json(newFriend);
});

app.put('/friends/:id', jsonParser, function(req, res){
  var chosenFriendId = Number(req.params.id);
  var chosenFriend = getFriendIdIndex(chosenFriendId);
  
  if(req.body.id == ''){
    return res.sendStatus(400)
  }
  
  if (chosenFriend>=0){
    var updatedFriend = friendToUpdate(chosenFriend, req.body)
    res.status(200).json(updatedFriend);
  }
  else{
    var newFriend = friendList.addFriend(req.params.body);
    res.status(200).json(newFriend);
  }
});

app.delete('/friends/:id', function(req, res){
  var chosenFriendId = Number(req.params.id);
  var chosenFriend = getFriendIdIndex(chosenFriendId);
  if(chosenFriend >= 0){
    var deletedFriend = friendToDelete(chosenFriend)
    return res.status(200).json(deletedFriend);
  }
  else{
    return res.sendStatus(404);
  }
  
})

// listen for requests 
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
