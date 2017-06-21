/*********************CREATION DE LA LISTE DES VOITURES*******************/

$(function()
{
	var request = $.ajax(
	{
		url:"http://localhost/tp_ajax/api/location.php",
		method:"GET",
		dataType:"json"
	});

	request.done(function(data)
	{
		var content = "";
		data.forEach(function(element)
		{
			content +='<li id="voiture-'+element.id_location+'"><a href="#">'+element.marque+' '+element.modele+'</a></li>';
		});
		$("#right_column ul").html(content);


/******************FONCTION D'AFFICHAGE AU CLICK*******************/

		$("#right_column ul > li").click(function(e)
		{
			e.preventDefault();
			var idUser = $(this).attr("id");
			idUser=idUser.split("-");

			var request = $.ajax(
			{
				url:"http://localhost/tp_ajax/api/location.php",
				method:"GET",
				data:(id_location : idUser[1]),
				dataType:"json"
			});

			request.done(function(datalocation)
			{
				$("#marque").val(datalocation[0].marque);
				$('#modele').val(datalocation[0].modele);
				$('#annee').val(datalocation[0].annee);
				$('#couleur').val(datalocation[0].couleur);
				$('#image').append('<img src='+datalocation[0].image+'>');
				$("#id_location").val(datalocation[0].id_location);
			});

		});
	});
	request.fail(function( jqXHR, textStatus ) 
	{
 	 	alert( "Request failed: " + textStatus );
	});


/*******************SUBMIT DU FORMULAIRE**********************/


	$('form').submit(function(e) 
	{
			e.preventDefault();
			//console.log($(this).attr("id"));
			
			var request = $.ajax(
			{
				url:"http://localhost/tp_ajax/api/location.php",
				method: "POST",
				data : $('form').serialize() //permet de récupérer les données des input en chaine de caractère
			});

			request.done(function(data2)
			{
				$("#message_ajax").html("<div class='alert alert-success'><strong>Success!</strong> Voiture bien intégré !");
				//console.log("User register");
			});

			request.fail(function( jqXHR, textStatus ) 
			{
 	 			$("#message_ajax").html("<div class='alert alert-danger'><strong>Error! </strong> Voiture non intégré !");
			});
	});

/****************FONCTION DELETE *******************************/

		$("#deletevoiture").click(function(e)
	{
		e.preventDefault();
		//console.log("test");
		var request = $.ajax(
		{
			url:"http://localhost/tp_ajax/api/location.php",
			method: "POST",
			data : {id : $("#id_location").val()}
		});
		request.done(function(data2)
		{
			$("#message_ajax").html("<div class='alert-success'><strong>Success! </strong> Voiture bien supprimé !");
		});
		request.fail(function( jqXHR, textStatus ) 
		{
 	 		$("#message_ajax").html("<div class='alert-danger'><strong>Error! </strong> Voiture non supprimé !");
		});
	})

});