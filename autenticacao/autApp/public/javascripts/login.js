
$(function() {
    $("body").on('click', '#login', () => {
        event.preventDefault()
        $("#resposta").empty()
        $.ajax({
            url: 'http://localhost:4000/login',
            data: $("#formulario").serialize(),
            type: 'POST',
            success: function(data) {
                if (data.erro != undefined) {
                    $("#nome").val("")
                    $("#password").val("")
                    $("#resposta").empty()
                    $("#resposta").append(data.erro)
                } else {
                    window.location.replace("http://localhost:4000/")
                }
            }
        });
    })
})