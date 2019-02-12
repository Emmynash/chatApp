// class Users {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     getUserDescription(name, age) {
//         return (`${name}, age ${age} has been registered!`);
//     }
// }

// var user = new Users('Olams', 19);
// var description = user.getUserDescription("Liam", 26)
// console.log(description);

class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, displayName, chatRoom) {
        var user = { id, displayName, chatRoom };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];

    }

    getUsersList(chatRoom) {
        var filterUsers = this.users.filter((user) => user.chatRoom === chatRoom);
        var namesArray = filterUsers.map((user) => user.displayName);

        return namesArray;
        // console.log(namesArray);
    }

}

// var users = new Users();
// var getUsersInRoom = users.getUsersList("Sapphire");
// console.log(getUsersInRoom);

module.exports = { Users }