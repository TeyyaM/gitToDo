$(() => {
  console.log("DOCUMENT IS READY");
  $("#new-todo ").on("submit", event => {
    event.preventDefault();                  // Prevent default action
    // const $serialized = $(this).serialize(); //Create jQuery string out of form data (text=....)
    let textLength = $('#todo-name').val().length;
    console.log("TEXT length", textLength);
    $("#err").slideUp();
    if (textLength <= 0) { // Empty tweet handler
      const errShort = $(`<p id="err">Error. You can't have empty todo name</p>`);
      $('#new-todo').prepend(errShort);
      $("#err").slideDown();

    // } else if (textLength > 140) {  // Overlength tweet handler
    //   const errLong = $(`<p id="err">Error. Your tweet is too long. Make it shorter </p>`);
    //   $('#length-err-msg').prepend(errLong);
    //   $("#err").slideDown();
    // } else {
    //   $.ajax({ url: "/tweets", data: $serialized, type: 'POST' }) // Ajax request sending serialized data to /tweets URL
    //     .then(function(result) {
    //       $.ajax('/tweets', { method: 'GET' }) // Gets the tweets from /tweets
    //         .then(function(jsonResponse) {
    //           const $createdTweet = createTweetElement(jsonResponse[jsonResponse.length - 1]); //Creates HTML structured tweet
    //           $('#tweets').prepend($createdTweet); // And adds it to the beginning of the page
    //           $('#tweet-text').val("");
    //           $('.counter').text("140"); // Reset counter to default value after submit
    //         });
    //     });
    }
  });

})

// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((res) => {
//     for (user of res.users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });
// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/todos"
//   }).done((res) => {
//     for (todo of res.todos) {
//       $("<div>").text(todo.name).appendTo($("body"));
//     }
//   });;
// });
// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/login"
//   }).done((res) => {
//     for (user of res.users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

