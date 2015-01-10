var app = {};
app.room = 'HackReactor';
app.server = 'http://localhost:3000/';
app.friends = [];
app.rooms = {};

app.init = function () {
  app.createDropDown(app.rooms);
  app.fetch(app.room);
  setInterval( function() {
    app.fetch(app.room);
    app.rooms = app.getRooms();
    app.createDropDown(app.rooms);
  }, 500);
};

app.fetch = function (room) {
  $.ajax({
    url: app.server + 'classes/messages',
    type: 'GET',
    data: {
      order: "-createdAt",
      where: { "roomname": room }
    },
    success: function (data) {
      app.messages = data;
    },
    complete: app.displayMessages
  });
};

app.getRooms = function () {
  $.ajax({
    url: app.server + 'classes/messages',
    type: 'GET',
    data: {
      order: "-createdAt",
    },
    success: function (data) {
      return roomStorage(data);
    }
  });

  var roomStorage = function (data) {

    for (var i = 0; i < data.length; i++) {
      var roomName = app.escapeHtml(data[i]["roomName"]);
      if (app.rooms[roomName] === undefined) {
        app.rooms[roomName] = true;
      }
    }
  };
  return app.rooms;
};

app.send = function (message) {

  $.ajax({
    url: app.server + 'classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('Successfully added');
    },
    error: function (data) {
      console.log('Unsuccessful');
    }
  });
};


app.addMessage = function (message) {
  $('#chats').prepend("<li class='list-group-item'>" + "<strong class='username'>" + app.escapeHtml(message.username) + "</strong>: " + app.escapeHtml(message.text)  + "</li>");
};

app.displayMessages = function () {
  app.clearMessages();
  var element;
  for (var i = 0; i < app.messages.length; i++) {
    app.messages[i]['createdAt'] = JSON.parse(app.messages[i]['createdAt']);
    if (app.messages[i]['userName'] !== undefined) {
      if (app.friends.indexOf(app.messages[i]['username']) > -1) {
        element = "<li class='list-group-item friend'>" + "<strong class='username'>" + app.escapeHtml(app.messages[i]['userName']) + "</strong>: " + app.escapeHtml(app.messages[i]['text']) + '<span class ="time">' + moment(app.messages[i]['createdAt']).fromNow() + "</span></li>";
      } else {
        element = "<li class='list-group-item'>" + "<strong class='username'>" + app.escapeHtml(app.messages[i]['userName']) + "</strong>: " + app.escapeHtml(app.messages[i]['text']) + '<span class ="time">' + moment(app.messages[i]['createdAt']).fromNow() + "</span></li>";
      }
    }
  $('ul#chats').prepend(element);
  }
};

app.createDropDown = function (rooms) {
  $('.newRoom').siblings().empty();
  var roomNames = [];
  var elements = [];
  for (var key in rooms) {
    roomNames.push(key);
  }
  for (var i = 0; i < roomNames.length; i++) {
    elements.push("<li><a href='#' class='roomName'>" + roomNames[i] + "</a></li>");
  }
  $("#roomMenu").append(elements.join(''));
};

app.clearMessages = function () {
  $('#chats').empty();
  $('.nav-tabs').empty();
  $('.tab-content ul').empty();
};

app.addRoom = function (room) {
  $('#roomSelect').append('<li>' + room + '</li>');
};

app.escapeHtml = function (string) {
  var entityMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': '&quot;',
      "'": '&#39;',
      "/": '&#x2F;'
  };
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
};

app.escapeRoom = function (string) {
  if (string.indexOf(" ") === 1) {
    string.split(' ').join('');
  }
  return string;
};

app.handleSubmit = function () {
  var username = window.username;
  var text = $('#message').val();

  var message = {
    'username' : username,
    'text' : text,
    'roomname' : app.room
  };
  app.send(message);
  $('#message').val('');
};

app.addFriend = function (username) {
  if (app.friends.indexOf(username) === -1) {
    app.friends.push(username);
  }
};

app.init();
