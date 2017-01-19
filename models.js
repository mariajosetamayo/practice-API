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

var friendToUpdate = function(chosenFriend, request){
  var updateFriend = friendList.friends[chosenFriend];
  var keys = Object.keys(request);
  keys.forEach(function(key){
    updateFriend[key] = request[key];
  });
  return updateFriend
}

var friendToDelete = function(chosenFriend){
  var deleteFriend = friendList.friends[chosenFriend];
  friendList.friends.splice(chosenFriend, 1);
  return deleteFriend
}

exports.friendList = friendList;
exports.getFriendIdIndex = getFriendIdIndex;
exports.friendToUpdate = friendToUpdate;
exports.friendToDelete = friendToDelete;