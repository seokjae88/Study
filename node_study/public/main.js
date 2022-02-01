$(function() {
    var FADE_TIME = 150; // ms
    var TYPING_TIMER_LENGTH = 400; // ms
    var COLORS = [
        '#e21400', '#91580f', '#f8a700', '#f78b00',
        '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
        '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
    ];

    // Initialize variables
    var $window = $(window);
    var $error = $('.error'); // Input for username
    var $usernameInput = $('.usernameInput'); // Input for username
    var $userroomInput = $('.userroomInput'); // Input for username
    var $messages = $('.messages'); // Messages area
    var $inputMessage = $('.inputMessage'); // Input message input box

    var $user_list = $('.userlist'); // The login page
    var $room_list = $('.room_list'); // The login page

    var $loginPage = $('.login.page'); // The login page
    var $roomPage = $('.room.page'); // The room page
    var $chatPage = $('.chat.page'); // The chatroom page
    var $errorPage = $('.error.page'); // The login page

    // Prompt for setting a username
    var username;
    var roomnum;
    var connected = false;
    var typing = false;
    var lastTypingTime;
    var currentpage = 'login';
    var $currentInput = $usernameInput.focus();

    var socket = io();

    const init = () => {
        if( currentpage == 'login') {
            $loginPage.fadeOut();
            $loginPage.show();
            $loginPage.off('click');

        } else if(currentpage == 'room') {
            $roomPage.fadeOut();
            $loginPage.show();
            $roomPage.off('click');

        } else if(currentpage == 'chat') {
            $chatPage.fadeOut();
            $loginPage.show();
            $chatPage.off('click');
        } else if(currentpage == 'error') {
            $errorPage.fadeOut();
            $loginPage.show();
            $errorPage.off('click');
        }

        currentpage = 'login';
        username = '';
        roomnum = '';
        $currentInput = $usernameInput.focus();
    }
    const setRoomnum = () => {
        roomnum = cleanInput($userroomInput.val().trim());

        // If the username is valid
        if (roomnum) {
            $roomPage.fadeOut();
            $chatPage.show();
            $roomPage.off('click');
            $currentInput = $inputMessage.focus();

            // Tell the server your username
            socket.emit('join', {'room':roomnum,'username':username});

            currentpage = 'chat';
        }
    }
    // Sets the client's username
    const setUsername = () => {
        username = cleanInput($usernameInput.val().trim());

        // If the username is valid
        if (username) {
            $loginPage.fadeOut();
            $roomPage.show();
            $loginPage.off('click');
            $currentInput = $userroomInput.focus();

            socket.emit('add user', username);

            currentpage = 'room';
        }
    }

    // Sends a chat message
    const sendMessage = () => {
        var message = $inputMessage.val();
        // Prevent markup from being injected into the message
        message = cleanInput(message);
        // if there is a non-empty message and a socket connection
        if (message && connected) {
            $inputMessage.val('');
            addChatMessage({
                username: username,
                message: message
            });
            // tell server to execute 'new message' and send along one parameter
            socket.emit('new message', message);
        }
    }

    // Log a message
    const log = (message, options) => {
        var $el = $('<li>').addClass('log').text(message);
        addMessageElement($el, options);
    }

    const error = (message) => {
        if( currentpage == 'login') {
            $loginPage.fadeOut();
            $errorPage.show();
            $loginPage.off('click');

        } else if(currentpage == 'room') {
            $roomPage.fadeOut();
            $errorPage.show();
            $roomPage.off('click');

        } else if(currentpage == 'chat') {
            $chatPage.fadeOut();
            $errorPage.show();
            $chatPage.off('click');
        }

        currentpage = 'error';

        var $error_msg = $('<li>' + message + '</li>');
        $error.append($error_msg);
    }

    // Adds the visual chat message to the message list
    const addChatMessage = (data, options) => {
        // Don't fade the message in if there is an 'X was typing'
        var $typingMessages = getTypingMessages(data);
        options = options || {};
        if ($typingMessages.length !== 0) {
            options.fade = false;
            $typingMessages.remove();
        }

        var $usernameDiv = $('<span class="username"/>')
            .text(data.username)
            .css('color', getUsernameColor(data.username));
        var $messageBodyDiv = $('<span class="messageBody">')
            .text(data.message);

        var typingClass = data.typing ? 'typing' : '';
        var $messageDiv = $('<li class="message"/>')
            .data('username', data.username)
            .addClass(typingClass)
            .append($usernameDiv, $messageBodyDiv);

        addMessageElement($messageDiv, options);
    }

    // Adds the visual chat typing message
    const addChatTyping = (data) => {
        data.typing = true;
        data.message = 'is typing';
        addChatMessage(data);
    }

    // Removes the visual chat typing message
    const removeChatTyping = (data) => {
        getTypingMessages(data).fadeOut(() => {
            $(this).remove();
        });
    }

    const addRoomlist = (data) => {
        var rooms = data.rooms;

        $room_list.empty();
        if(rooms.length <= 0) {
            var $room = $('<li class="room_name">NONE</li>');
            $room_list.append($room);
        } else {
            for(var i=0; i<rooms.length; i++){

                var $room = $('<li class="room_name">' + rooms[i] + '</li>');
                $room_list.append($room);
            }
        }
    }

    const addUserlist = (data) => {
        var users = data.users;

        $user_list.empty();
        var title = '접속중인 인원 : [' + users.length + ']명';
        var $user = $('<li class="users">' + title + '</li>');
        $user_list.append($user);

        for(var i=0; i<users.length; i++) {

            var $user = $('<li class="users">' + users[i] + '</li>');
            $user_list.append($user);
        }
    }

    // Adds a message element to the messages and scrolls to the bottom
    // el - The element to add as a message
    // options.fade - If the element should fade-in (default = true)
    // options.prepend - If the element should prepend
    //   all other messages (default = false)
    const addMessageElement = (el, options) => {
        var $el = $(el);

        // Setup default options
        if (!options) {
            options = {};
        }
        if (typeof options.fade === 'undefined') {
            options.fade = true;
        }
        if (typeof options.prepend === 'undefined') {
            options.prepend = false;
        }

        // Apply options
        if (options.fade) {
            $el.hide().fadeIn(FADE_TIME);
        }
        if (options.prepend) {
            $messages.prepend($el);
        } else {
            $messages.append($el);
        }
        $messages[0].scrollTop = $messages[0].scrollHeight;
    }

    // Prevents input from having injected markup
    const cleanInput = (input) => {
        return $('<div/>').text(input).html();
    }

    // Updates the typing event
    const updateTyping = () => {
        if (connected) {
            if (!typing) {
                typing = true;
                socket.emit('typing');
            }
            lastTypingTime = (new Date()).getTime();

            setTimeout(() => {
                var typingTimer = (new Date()).getTime();
                var timeDiff = typingTimer - lastTypingTime;
                if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
                    socket.emit('stop typing');
                    typing = false;
                }
            }, TYPING_TIMER_LENGTH);
        }
    }

    // Gets the 'X is typing' messages of a user
    const getTypingMessages = (data) => {
        return $('.typing.message').filter(i => {
            return $(this).data('username') === data.username;
        });
    }

    // Gets the color of a username through our hash function
    const getUsernameColor = (username) => {
        // Compute hash code
        var hash = 7;
        for (var i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + (hash << 5) - hash;
        }
        // Calculate color
        var index = Math.abs(hash % COLORS.length);
        return COLORS[index];
    }

    // Keyboard events

    $window.keydown(event => {
        // Auto-focus the current input when a key is typed
        if (!(event.ctrlKey || event.metaKey || event.altKey)) {
            $currentInput.focus();
        }
        // When the client hits ENTER on their keyboard
        if (event.which === 13) {
            if ( currentpage == 'login') {
                setUsername();
            } else if (currentpage == 'room') {
                setRoomnum();
            } else if (currentpage == 'chat') { // chat
                sendMessage();
                socket.emit('stop typing');
                typing = false;
            } else if (currentpage == 'error') { // chat
                init();
            } else {

            }
        }
    });

    $inputMessage.on('input', () => {
        updateTyping();
    });

    // Click events

    // Focus input when clicking anywhere on login page
    $loginPage.click(() => {
        $currentInput.focus();
    });

    // Focus input when clicking anywhere on login page
    $roomPage.click(() => {
        $currentInput.focus();
    });

    // Focus input when clicking on the message input's border
    $inputMessage.click(() => {
        $inputMessage.focus();
    });

    // Socket events

    socket.on('roomlist', (data) => {
        addRoomlist(data);
    });

    // Whenever the server emits 'login', log the login message
    socket.on('login', (data) => {
        connected = true;
        // Display the welcome message
        var message = "Welcome to Socket.IO Chat – " + roomnum;
        log(message, {
            prepend: true
        });
        addUserlist(data);
    });

    // Whenever the server emits 'new message', update the chat body
    socket.on('new message', (data) => {
        addChatMessage(data);
    });

    // Whenever the server emits 'user joined', log it in the chat body
    socket.on('user joined', (data) => {
        log(data.username + ' joined');
        addUserlist(data);
    });

    // Whenever the server emits 'user left', log it in the chat body
    socket.on('user left', (data) => {
        log(data.username + ' left');
        addUserlist(data);
        removeChatTyping(data);
    });

    // Whenever the server emits 'typing', show the typing message
    socket.on('typing', (data) => {
        addChatTyping(data);
    });

    // Whenever the server emits 'stop typing', kill the typing message
    socket.on('stop typing', (data) => {
        removeChatTyping(data);
    });

    socket.on('disconnect', () => {
        log('you have been disconnected');
    });

    socket.on('error msg', (data) => {
        error(data);
    });

    // socket.on('reconnect', () => {
    //     log('you have been reconnected');
    //     if (username) {
    //         socket.emit('add user', username);
    //     }
    // });

    socket.on('reconnect_error', () => {
        log('attempt to reconnect has failed');
    });

});