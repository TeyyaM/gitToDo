$(() => {
  $("#new-todo ").on("submit", (event) => {
    // Empty todo handler
    let textLength = $("#todo-name").val().length;
    $("#err").remove();
    if (textLength <= 0) {
      event.preventDefault();
      const errShort = $(
        `<p id="err">Error. You can't have empty todo name</p>`
      );
      $("#new-todo").prepend(errShort);
      $("#err").slideDown();
    }
  });

  /* Sarah Nicholsonvar
7:17 PMSarah Nicholson$('#form').serializeArray() */

  $("#category-change").on("submit", (event) => {
    event.preventDefault();
    const dbIndex = $("#category").val();
    const toDoId = $("#category-change").attr("data-to-id");
    // console.log(toDoId);

    // if (data === "Eat") {
    //   dbIndex = 2;
    // } else if (data === "Read") {
    //   dbIndex = 3;
    // } else if (data === "Watch") {
    //   dbIndex = 4;
    // } else if (data === "Buy") {
    //   dbIndex = 5;
    // }
    $.ajax({
      type: "POST",
      url: `/todos/${toDoId}/category_id`,
      data: { dbIndex },
    })
      .then((res) => {
        location.href = `/todos/${toDoId}`;
      })
      .catch((err) => {
        console.log("oh no", err);
      });
  });

});
