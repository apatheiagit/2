'use strict'
const hidenseek = require('./hidenseek');
const Pokemons = require('./pokemons');
const PokemonList = require('./pokemonlist');

const path = './field/';

let lost = new PokemonList(), found = new PokemonList();

for (let pokemon of Pokemons){
	lost.add(pokemon.name, pokemon.level);
}

let tmp = hidenseek.hide(path, lost);
//tmp.show();

//let tmp2 = hidenseek.seek(path);


/*lost.add('Пикачу', 56);
lost.add('Чармандер', 20);
lost.add('Сквиртл', 31);
lost.add('Мисти', 14);

found.add('Джесси', 45);
found.add('Джеймс', 27);
found.add('Мяут', 33);

found.push(lost[0]);
lost.splice(0,1);

console.log('Покемоны из списка lost:');
lost.show();
console.log('\nПокемоны из списка found:');
found.show();

console.log('\nМаксимальный уроверь в списке lost: ', lost.max());
console.log('Максимальный уроверь в списке found: ', found.max());
*/