
$(function() {
    $("body").on('click', '#logout', () => {
        $.ajax({
            url: 'http://localhost:4000/logout',
            type: 'POST',
            success: function(data) {
               window.location.replace("http://localhost:4000/login")
            }
        });
    })
})