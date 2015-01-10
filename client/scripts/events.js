$(document).ready(function () {
  $('.changeName').hide();

  if (window.username === undefined) {
    $('#myModal').modal('show');
    $('.submit').hide();
    $('.changeName').show();
  }

  $('body').on('click', '.setname', function (e) {
    e.preventDefault();
    var name = $('.myname').val();
    $('#myModal').modal('hide');
    window.username = name;
    $('.submit').show();
    $('.changeName').hide();
  });

  $('.submit').on('click', app.handleSubmit);

  $('.tabber a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });

  $('body').on('click', '#roomMenu .roomName', function (e) {
    e.preventDefault();
    app.fetch($(this).text());
    app.room = $(this).text();
    $('h1').text(app.room);
  });

  $('body').on('click', ".setroomname", function (e) {
    e.preventDefault();
    app.room = $('.roomname').val();
    app.fetch(app.room);
    app.rooms[app.room] = true;
    $('h1').text(app.room);
    $('#myModalRoom').modal('hide');
  });

  $('h1').text(app.room);

  $('body').on('click', '.username', function (e) {
    e.preventDefault();
    if (app.friends.indexOf($(this).text()) === -1) {
      app.addFriend($(this).text());
      $('table').append("<tr><td>" + $(this).text() + "</td></tr>");
    }
  });

});
