const PokemonList = require('./pokemonlist');
const hide = (path, PokemonList) => {
	return "yes!";
};
const seek = (path) =>{
	return PokemonList;
}
module.exports = {
	hide,
	seek
};