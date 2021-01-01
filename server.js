const WebSocket = require("ws");
let { users, onlineUsers } = require("./users");
let { login } = require("./loginManager");

const wss = new WebSocket.Server({
  port: 6969,
});

wss.on("connection", (ws) => {
  console.log(`Connection incoming`);
  // let loggedIn = false;
  let user = null;
  ws.send(
    "Kérlek add meg a felhasználóneved és a jelszavad @-cal elválasztva:"
  );
  ws.on("message", (data) => {
    if (user !== null) {
      if (!data.startsWith("!")) {
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(`${user.name}#{${user.username}} : ${data}`);
          }
        });
      } else if (data.startsWith("!")) {
        let commands = data.split(" ");
        if (commands[0] === "!online") {
          let output = "";
          onlineUsers.forEach((oUser) => {
            let line = `---${oUser.name}{${oUser.username}}\n`;
            output += line;
          });
          ws.send(output);
        }
        if (commands[0] === "!exit") {
          ws.close(1000, "Kilépve");
        }
        if (commands[0] === "!dm,") {
          console.log("DM parancs");
          let options = data.split(", ");
          console.log(options.length);
          if (options.length == 3) {
            let reciver = options[1];
            let message = options[2];

            console.log("Option length correct");

            if (
              onlineUsers.filter((oUsers) => oUsers.username == reciver)
                .length == 1
            ) {
              console.log("user found");
              let reciverWS = onlineUsers.filter(
                (oUsers) => oUsers.username == reciver
              )[0];
              console.log(reciverWS);
              reciverWS.ws.send(
                `DM (${user.name})#{${user.username}} ${message}`
              );
            } else {
              console.log("user not found");
            }
          } else {
            ws.send(
              `Túl sok vagy túl kevéd argument. Használd a "!help" parancsot`
            );
          }
        }
        if (commands[0] === "!help") {
          let output = `Kilépéshez írd be a "!exit" parancsot vagy nyomj ctrl+c -t!\n  Jelenleg elérhető felhasználók listájához írd be a "!online" parancsot\n  A !dm parancs használata "!dm, {A cél felhasználó felhasználóneve}, {üzenet}"`;
          ws.send(output);
        }
      }
    }
    //////////////////////////////////////////////////////////////////////////////////
    if (user === null) {
      user = login(data, users, user, onlineUsers, ws);
    }
  });
  ws.on("close", () => {
    if (user) {
      onlineUsers = onlineUsers.filter((ouser) => {
        return ouser.username != user.username;
      });
    }
  });
});
