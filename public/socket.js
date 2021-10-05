var socket = io();

var list = document.getElementById("messages");
var form = document.getElementById("form");
var input = document.getElementById("input");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (input.value) {
    socket.emit("send message", input.value);
    input.value = "";
  }
});

socket.on("receive message", function (message) {
  var item = document.createElement("li");
  item.textContent = message;
  list.appendChild(item);
});
