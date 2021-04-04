$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for (user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
$(() => {
  $.ajax({
    method: "GET",
    url: "/api/todos"
  }).done((todos) => {
    for (todo of todos) {
      $("<div>").text(todo.name).appendTo($("body"));
    }
  });;
});
