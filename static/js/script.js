$(document).ready(function () {
  $('#send-button').click(function () {
    sendMessage();
  });

  $('#message-input').keypress(function (e) {
    if (e.which === 13) {
      sendMessage();
    }
  });

  function sendMessage() {
    var userMessage = $('#message-input').val().trim();
    if (userMessage) {
      $('#chat-body').append('<div class="chat-message user">' + userMessage + '</div>');
      $('#message-input').val("");
      $('#chat-body').scrollTop($('#chat-body')[0].scrollHeight);

      $.ajax({
        url: '/chat',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ message: userMessage }),
        success: function (response) {
          $('#chat-body').append('<div class="chat-message bot">' + response.response + '</div>');
          $('#chat-body').scrollTop($('#chat-body')[0].scrollHeight);
        },
        error: function () {
          $('#chat-body').append('<div class="chat-message bot">Something went wrong!</div>');
        }
      });
    }
  }
});
