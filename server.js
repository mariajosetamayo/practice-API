
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Friends = require('./models');

var friendList = Friends.friendList;

app.use(express.static('public'));

var getFriendIdIndex = function (friendId){
  var index = -1;
  for (var i = 0;i<friendList.friends.length; i++){
    if (friendList.friends[i].id === friendId){
      index = i;
    }
  }
  return index 
}

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
    var friendToUpdate = friendList.friends[chosenFriend];
    var keys = Object.keys(req.body);
    keys.forEach(function(key){
      friendToUpdate[key] = req.body[key];
    });
    res.status(200).json(friendToUpdate);
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
    var friendToDelete = friendList.friends[chosenFriend];
    friendList.friends.splice(chosenFriend, 1);
    return res.status(200).json(friendToDelete);
  }
  else{
    return res.sendStatus(404);
  }
  
})

// listen for requests 
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
