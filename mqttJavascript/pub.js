var mqtt = require("mqtt");
const fs = require("fs");

var options = {
  clientId: "LOCAL_DATA",
  clean: true,
  useSSL: true,
  rejectUnauthorized: false,
  //keyPath: KEY,
  //certPath: SECURE_CERT,
  ca: [fs.readFileSync(__dirname + "/pem/ca.crt")],
};

var client = mqtt.connect("mqtts://192.168.1.4:8883", options);

var topic = "Trafficlight/duration";
var message = "15s";
var num = 0;
client.on("connect", () => {
  console.log("connected flag  " + client.connected);
  setInterval(() => {
    client.publish(topic, message + "[" + num++ + "]", {
      qos: 2,
      retain: true,
    });
    console.log("message sent!", message + "[" + num++ + "]");
  }, 5000);
});

client.on("error", function (error) {
  console.log("Can't connect" + error);
  process.exit(1);
});
