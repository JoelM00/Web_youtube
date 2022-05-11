$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');

      //Coloca num objeto o conteudo do item
      var toDo = {item: item.val()};

      //Cria um pedido post para o endereco /toDo
      $.ajax({
        type: 'POST',
        url: '/toDo',
        data: toDo,
        //pega na resposta do controller (data em formato json) e faz reload da pagina
        //ao fazer o render da pagina, ja vai ter os dados atualizados
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      //Substitui os espacos por - (na string que esta dentro da li)
      var item = $(this).text().replace(/ /g,'+')
      $.ajax({
        type: 'DELETE',
        url: '/toDo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
