const Pokemon = require('./pokemon');
class PokemonList extends Array {
	constructor(...Pokemons){
		super(...Pokemons);
	}
	add(name, level){
		let newPokemon = new Pokemon(name, level);
		this.push(newPokemon);
	}
	show(){
		for (let pokemon of this){
			console.log('%s - покемон %d уровня', pokemon.name, pokemon.level);
		}
		console.log('Общее количество покемонов: %d', this.length);
	}
	max(){
		return Math.max.apply(null, this);
	}
}
module.exports = PokemonList;