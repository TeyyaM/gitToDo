$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((res) => {
    for (user of res.users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
$(() => {
  $.ajax({
    method: "GET",
    url: "/api/todos"
  }).done((res) => {
    for (todo of res.todos) {
      $("<div>").text(todo.name).appendTo($("body"));
    }
  });;
});
$(() => {
  $.ajax({
    method: "GET",
    url: "/api/login"
  }).done((res) => {
    for (user of res.users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
