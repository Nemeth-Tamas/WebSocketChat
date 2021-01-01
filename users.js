const users = [
  {
    username: "nemethtamas",
    name: "Németh Tamás",
    password: "password",
    ws: null,
    loggedIn: false,
  },
  {
    username: "berkivera",
    name: "Némethné Berki Veronika",
    password: "password2",
    ws: null,
    loggedIn: false,
  },
  {
    username: "nemetheszter",
    name: "Németh Eszter",
    password: "password3",
    ws: null,
    loggedIn: false,
  },
  {
    username: "nemethzoltan",
    name: "Németh Zoltán",
    password: "password4",
    ws: null,
    loggedIn: false,
  },
];

let onlineUsers = [];

module.exports = { users, onlineUsers };
