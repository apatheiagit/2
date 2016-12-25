'use strict'
const hidenseek = require('./hidenseek');
const Pokemons = require('./pokemons');
const PokemonList = require('./pokemonlist');

const path = './field/';

let lost = new PokemonList(), found = new PokemonList();

for (let pokemon of Pokemons){
	lost.add(pokemon.name, pokemon.level);
}

hidenseek.hide(path, lost, function(hideList){
	hideList.show();
});

setTimeout(() => {hidenseek.seek(path)}, 500);

