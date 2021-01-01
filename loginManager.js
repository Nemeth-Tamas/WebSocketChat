const login = (data, users, user, onlineUsers, ws) => {
  if (data.includes("@")) {
    let username = data.split("@")[0];
    let password = data.split("@")[1];
    if (
      users.find(
        (user) => user.username == username && user.password == password
      )
    ) {
      user = users.find(
        (user) => user.username == username && user.password == password
      );
      if (onlineUsers.includes(user)) {
        ws.close(1000, "Felhasználó már be van jelentkezve");
      } else if (!onlineUsers.includes(user)) {
        user.ws = ws;
        onlineUsers.push(user);
        ws.send(`Üdvözöllek ${user.name}`);
        return user;
      }
    } else {
      ws.send("Felhasználó nem található. WebSocket zárva.");
      ws.close(1000, "Rossz felhasználónév vagy jelszó!");
    }
  } else {
    ws.close(1000, "Rossz formátum");
  }
};

module.exports = { login };
