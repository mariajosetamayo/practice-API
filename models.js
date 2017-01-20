var Friends = {
  // username: '',
  addFriend: function(name){
    var friend = {name:name, id: this.nextId};
    this.friends.push(friend);
    this.nextId += 1;
    return friend;
  },
  getIndexFromFriendId: function(friendId){
    var index = -1;
    for (var i = 0;i<this.friends.length; i++){
      if (this.friends[i].id === friendId){
        index = i;
      }
    }
    return index 
  },
  getFriendById: function(chosenFriendId){
    // sacamos el codigo del server y le pusimos en un nuevo metodo
    // el server no debe ver el index. 
      var prop = this.property; 
      var chosenFriend = this.getIndexFromFriendId(chosenFriendId);
      return this.friends[chosenFriend];
  },
  update: function(friend){
    var chosenFriendId = Number(friend.id);
    var prop = this.property;
    var chosenFriend = this.getIndexFromFriendId(chosenFriendId);
    console.log('this is the chosen friend', chosenFriend)
    
    if (chosenFriend>=0){
      var updateFriend = this.friends[chosenFriend];
      var keys = Object.keys(friend);
      keys.forEach(function(key){
        updateFriend[key] = friend[key];
      });
      return updateFriend
    }
    else{
      return this.addFriend(friend.name);
    }
  },
  delete:function(chosenFriendId){
    var prop = this.property;
    var chosenFriend = this.getIndexFromFriendId(chosenFriendId);
    if(chosenFriend >= 0){
      var deleteFriend = this.friends[chosenFriend];
      this.friends.splice(chosenFriend, 1);
      return deleteFriend;
    }
    else{
      return undefined;
    }
  },
};

var createFriendList = function (){
  var userFriends = Object.create(Friends);
  // userFriends.username = '',
  userFriends.friends = [];
  userFriends.nextId = 1;
  return userFriends
}

exports.createFriendList = createFriendList;