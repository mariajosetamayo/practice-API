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

exports.friendList = friendList;