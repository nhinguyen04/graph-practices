// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    this.currentID++;
    let newUser = {
      id: this.currentID,
      name: name
    }

    this.users[newUser.id] = newUser;
    this.follows[newUser.id] = new Set();

    return this.currentID;
  }

  getUser(userID) {
    if (!this.users[userID]) return null;
    else return this.users[userID];
  }

  follow(userID1, userID2) {
    if (this.users[userID1] && this.users[userID2]) {
      this.follows[userID1].add(userID2);
      return true;
    } else return false;
  }

  getFollows(userID) {
    return this.follows[userID];
  }

  getFollowers(userID) {
    let followers = new Set();

    for (const [key, value] of Object.entries(this.follows)) {
      if (value.has(userID)) followers.add(Number(key));
    }

    return followers;
  }

  getRecommendedFollows(userID, degrees) {
    // Your code here
  }
}


module.exports = SocialNetwork;
