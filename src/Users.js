/*
Drew Bozarth
dbozarth@chapman.edu
Technical-Take-Home : Client : Users.js
!! REFERENCES !! This class was borrow from Web Dev Journey - https://github.com/webdevjourneyWDJ/Chat-App
This is a class created to store an array of users 
*/
class Users {
    constructor() {
      this.users = [];
    }
    // an element of the array is a user which has a socket id, a username, and the room they are in
    addUser(id, name, room) {
      let user = {id, name, room};
      this.users.push(user);
      return user;
    }
  
    // returns a list of the users currently online in a room give the room's name
    getUserList (room) {
      let users = this.users.filter((user) => user.room === room);
      let namesArray = users.map((user) => user.name);
  
      return namesArray;
    }
  
    // returns the user object from the socket.id
    getUser(id) {
      return this.users.filter((user) => user.id === id)[0];
    }
  
    // this finds a user based on their socket.id and removes them from the list
    //   kept of online users but still returns the user object so other things
    //   can be done with it in index.js
    removeUser(id) {
      let user = this.getUser(id);
  
      if(user){
        this.users = this.users.filter((user) => user.id !== id);
      }
  
      return user;
    }
  
}
  
module.exports = {Users};