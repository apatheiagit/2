const PokemonList = require('./pokemonlist');
const random = require('./random');
const fs = require('fs');

const hide = (path, PokemonList) => {
	let totalCount  = PokemonList.length;
	let hideCount = random(3, totalCount);
	for (let i = 1; i < 10; ++i){
		let name = path + '0' + i;
		fs.mkdir(name, err => {
			if (err) throw err;
			console.log('Папка %s создана', i);
			});
	}
	return "yes!";
};
const seek = (path) =>{
	return PokemonList;
}
module.exports = {
	hide,
	seek
};