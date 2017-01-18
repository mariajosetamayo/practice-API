
var express = require('express');
var app = express();

app.use(express.static('public'));

var Friends = {
  username: '',
  addFriend: function(name){
    var friend = {name:name, id: this.setId};
    this.friends.push(friend);
    this.setId += 1;
    return friend;
  }
};

var createFriendList = function (){
  var userFriends = Object.create(Friends);
  userFriends.username = '',
  userFriends.friends = [];
  userFriends. setId = 1;
  return userFriends
}

var friendList = createFriendList();
friendList.username = 'Renee'
friendList.addFriend('Maria');
friendList.addFriend('Ana');
friendList.addFriend('Monica');

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

app.post('/friends', function(req, res){
  var newFriend = friendList.add(req.body.name);
  
  res.status(200).json(newFriend);
});

app.put('/friends/:id', function(req, res){
  
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
