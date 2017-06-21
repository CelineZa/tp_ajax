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


/******************FONCTION AU CLICK*******************/

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

});