module.exports = function(app, petModel){

	app.post('/msdapi/project/pet', createPet);
	app.delete('/msdapi/project/:id', deletePet);

	function createPet(req, res){
		var newPet = req.body;
		model.createPet(newPet)
			 .then(function(result, err){
			 	if(err){
			 		throw err;
			 	}
			 	res.jsonp(result);
			 });
	}

	function deletePet(req, res){
		var id = req.params.id;
		model.deletePet(id);
		     .then(function(result, err){
		     	if(err){
		     		throw err;
		     	}
		     });
	}

}