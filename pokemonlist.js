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
			pokemon.show();
		}
		console.log('Общее количество покемонов: %d', this.length);
	}
	max(){
		this.sort(function(a, b) {
		  return b.level - a.level;
		});
		return this[0];
	}
}
module.exports = PokemonList;