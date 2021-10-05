const options = {
  zone: document.getElementById("joystick_zone"),
  color: "black",
};

var manager = nipplejs.create(options);

manager.on("move", (event) => {
  console.log("moveu");
});
