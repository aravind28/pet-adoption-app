module.exports = function(app, petModel){

	app.post('/msdapi/project/pet', createPet);
	app.post('/msdapi/project/petfavoritelist/:petid', createFavoriteList);
	app.get('/msdapi/project/getfavoritelist/:petid/user', getFavoriteList);
	app.get('/msdapi/project/listallpets', listAllPets);
	app.get('/msdapi/project/getpetbyid/:id', getPetById);
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
		model.deletePet(id)
		     .then(function(result, err){
		     	if(err){
		     		throw err;
		     	}
		     });
	}


	function listAllPets(req, res){
		petModel
			.listAllPets()
			.then(
				function (pet) {
					res.json(pet);
				},

				function () {
					res.status(400).send(err);
				}
			);
	}

	function getPetById(req, res){
		petModel
			.findById(req.params.id)
			.then(
				function (pet) {
					return petModel.listAllPets();
				},

				function (err) {
					res.status(400).send(err);
				}
			)
			.then(
				function (pets) {
					res.json(pets);
				},
				function (err) {
					res.status(400).send(err);
				}
			)
	}

	function createFavoriteList(req, res){
		var petDetails = req.body;
		var userId = req.params.userId;

		petModel
			.createFavoriteList(userId, petDetails)
			// add user to pet favorite list
			.then(
				function (pet) {
					return petModel.createFavoriteList(userId, pet);
				},
				function (err) {
					res.status(400).send(err);
				}
			)

			// add pet to user's favorite list
			.then(
				function (user) {
					res.json(user);
				},
				function (err) {
					res.status(400).send(err);
				}
			);
	}

	function getFavoriteList(req, res){
		var petId = req.params.petId;
		var pet = null;

		petModel
			.findPetById(petId)
			.then(
				function (doc) {
					pet = doc
					if(doc){
						return petModel.findPetById(pet.favorites);
					}
					else{
						res.json({});
					}
				},
				function (err) {
					res.status(400).send(err);
				}
			)
			.then(
				function (users) {
					pet.userFavortites = users;
					res.json(pet);
				},
				function (err) {
					res.status(400).send(err);
				}
			);
	}

}