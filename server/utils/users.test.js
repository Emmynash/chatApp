const expect = require('expect');
const { Users } = require('./users');

describe("Users", () => {

    var users;

    beforeEach(function() {
        this.timeout(0);
        users = new Users();
        users.users = [{
                id: "1",
                displayName: "Almadin",
                chatRoom: "Sapphire"
            },
            {
                id: "2",
                displayName: "Halim",
                chatRoom: "Ruby"
            },
            {
                id: "3",
                displayName: "Raheem",
                chatRoom: "Sapphire"
            }
        ];
    })
    it("Should add new users", () => {
        var id = "7823dbnmze";
        var displyaName = "Root";
        var chatRoom = "Rome";

        var users = new Users();

        var resUser = users.addUser(id, displyaName, chatRoom)
        expect(users.users).toEqual([resUser]);
    })

    it("Should return display names for Chat room (Sapphire)", () => {
        // console.log(users);
        var usersList = users.getUsersList("Sapphire");

        // console.log(usersList);
        expect(usersList).toEqual(['Almadin', 'Raheem']);
    })


    it("Should return display names for Chat room (Ruby)", () => {
        // console.log(users);
        var usersList = users.getUsersList("Ruby");

        // console.log(usersList);
        expect(usersList).toEqual(['Halim']);
    })

    it("Should return a user with valid id", () => {
        var fetchUserwithId = users.getUser("3")
        expect(fetchUserwithId).toEqual(['3']);
    })

    it("Should not return a user with invalid id", () => {
        var fetchUserwithId = users.getUser("44")
        expect(fetchUserwithId).toEqual([]);
    })
    it("Should delete a user with valid id", () => {
        var fetchUserwithId = users.removeUser("3")
        console.log(fetchUserwithId);
        // expect(users.id).toBe("3")
        // expect(fetchUserwithId.users.length).toBe(2);
        expect(fetchUserwithId).toEqual(expect.not.arrayContaining(['3']));
    })
    it("Should not delete a user with invalid id", () => {
        var fetchUserwithId = users.removeUser("44")
        expect(fetchUserwithId).toEqual(['1', '2', '3']);
    })
})