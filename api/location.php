<?php

// Connexion à la base de donnée mikemonroi
try{
	$bdd = new PDO('mysql:host=localhost;dbname=mikemonroi','root','');
	$bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
}
catch(PDOException $e){
	echo 'Connexion impossible. Message error :'.$e;
}

// Si la méthode utilisée est POST, on insère les données rentrées dans le formulaire, dans la table location.
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
	if(!empty($_POST))
	{
		if(!empty($_POST['id_location'])) // Si on envoie un id, on fait la requête de suppression.
		{
			$req = $bdd->prepare("DELETE FROM location WHERE id_location = :id_location");
			$req->bindParam(':id_location', $_POST['id_location']);
		}
		else // Sinon on exécute la requête d'insertion.
		{
			$req = $bdd-> prepare("INSERT INTO location(marque, modele, annee, couleur, image) VALUES(:marque, :modele, :annee, :couleur, :image)");

			$req->bindParam(':marque', $_POST['marque'], PDO::PARAM_STR);
			$req->bindParam(':modele', $_POST['modele'], PDO::PARAM_STR);
			$req->bindParam(':annee', $_POST['annee'], PDO::PARAM_INT);
			$req->bindParam(':couleur', $_POST['couleur'], PDO::PARAM_STR);
			$req->bindParam(':image', $_POST['url'], PDO::PARAM_STR);
		}

		$req->execute();	
		var_dump($_POST);
	}		
}
elseif($_SERVER['REQUEST_METHOD'] == 'GET')
{
	if(empty($_GET))
	{
		$req = $bdd->prepare("SELECT * FROM location");
	}
	else
	{
		$req = $bdd->prepare("SELECT * FROM location WHERE id_location = " . $_GET['id_location']);
	}

	$req->execute();
	//echo "<pre>"; var_dump($stmt->fetchAll()); echo "</pre>";
	echo json_encode($req->fetchAll()); // Transforme notre tableau PHP en JSON.
}
