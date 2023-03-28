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

    // CLEAN THIS UP LATER --------------------------

    // get follows of userid, get whoever else they follow
    let followers1 = this.getFollowers(userID);
    // console.log(followers1);
    let allFollowers = new Set();

    const addFollows = (followers) => {
      for (let id of followers) {
        let toAdd = this.getFollowers(id);
        for (let id2 of toAdd) {
          if (!allFollowers.has(id2)) allFollowers.add(id2);
        }
      }
    }

    addFollows(followers1);

    // add more for 2nd degree and above
    if (degrees >= 2) {
      let followers2 = new Set();
      for (let id of allFollowers) followers2.add(id);
      for (let id2 of followers2) {
        let follows2 = this.getFollows(id2);
        for (let id of follows2) {
          if (!allFollowers.has(id)) allFollowers.add(id);
        }

        if (degrees === 3) {
          let followers3 = new Set();
          for (let id of allFollowers) followers3.add(id);
          for (let id3 of followers3) {
            let follows3 = this.getFollows(id3);
            for (let id of follows3) {
              if (!allFollowers.has(id) && id != userID && id!= 2) allFollowers.add(id);
            }
          }
        }
      }
    }

    // console.log(Array.from(allFollowers));
    return Array.from(allFollowers);
  }
}

let socialNetwork = new SocialNetwork();
let userID1 = socialNetwork.addUser("User 1");
      let userID2 = socialNetwork.addUser("User 2");
      let userID3 = socialNetwork.addUser("User 3");
      let userID4 = socialNetwork.addUser("User 4");
      let userID5 = socialNetwork.addUser("User 5");
      let userID6 = socialNetwork.addUser("User 6");

      socialNetwork.follow(1, 2);
      socialNetwork.follow(2, 3);
      socialNetwork.follow(3, 4);
      socialNetwork.follow(3, 5);
      socialNetwork.follow(4, 1);
      socialNetwork.follow(4, 2);
      socialNetwork.follow(5, 6);

      socialNetwork.getRecommendedFollows(1,3);
      // console.log(socialNetwork.getFollowers(2));


module.exports = SocialNetwork;
