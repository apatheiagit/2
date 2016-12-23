const PokemonList = require('./pokemonlist');
const random = require('./random');
const fs = require('fs');
const randomIndexes = new Array();
const pokemonList = new PokemonList();	
const hideList = new PokemonList();	

const hide = (path, list) => {
	
	for (let pokemon of list){
		pokemonList.push(pokemon);
	}

	let totalCount  = pokemonList.length;
	let hideCount = random(3, totalCount);

	for (let i = 0; i < hideCount; ++i){
		let randomIndex = random(0, totalCount-1);
		let idx = randomIndexes.indexOf(randomIndex);
		while (idx == -1){
			randomIndexes.push(randomIndex);			
			randomIndex = random(0, totalCount-1);
			idx = randomIndexes.indexOf(randomIndex);
		}		
	}

	if (fs.existsSync(path)) {
		deleteFolderRecursive(path);
	}

	randomIndexes.sort();

	fs.mkdir(path, err =>{
		if (err) throw err;
		for (let i = 0; i < 10; ++i){
			let j = i + 1;
			let name = path + ('0' + j).slice(-2);
			createFolder(name, i);
		}
	});
	//hideList.show();
	console.log(randomIndexes);

};

const seek = (path) =>{
	return pokemonList;
};

const deleteFolderRecursive = (path) => {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach((file,index) => {
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { 
        deleteFolderRecursive(curPath);
      } else { 
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const createFolder = (name, i) => {
	fs.mkdir(name, err => {
		if (err) throw err;	
		if (randomIndexes.indexOf(i) != -1){
			console.log(i);
			let text = pokemonList[i].name + '|' + pokemonList[i].level;			
			hideList.push(pokemonList[i]);
			createPokemonFile(name, text);
		}					
	});
};

const createPokemonFile = (path, text) => {
	fs.writeFile(path + '/pokemon.txt', text, 'utf8', err => {
		if (err) throw err;	
	})
};

module.exports = {
	hide,
	seek
};