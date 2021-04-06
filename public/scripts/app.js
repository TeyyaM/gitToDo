$(() => {

  $("#new-todo ").on("submit", event => {
    // Empty todo handler
    let textLength = $('#todo-name').val().length;
    $("#err").remove();
    if (textLength <= 0) {
      event.preventDefault();
      const errShort = $(`<p id="err">Error. You can't have empty todo name</p>`);
      $('#new-todo').prepend(errShort);
      $("#err").slideDown();
    }
  });

})
