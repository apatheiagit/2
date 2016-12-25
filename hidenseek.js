const PokemonList = require('./pokemonlist');
const random = require('./random');
const fs = require('fs');

const hide = (path, pokemonList, callback) => {	
	let hideList = new PokemonList();
	let totalCount  = pokemonList.length;
	let maxHideCount = Math.min(pokemonList.length, 3); 
	let hideCount = random(1, maxHideCount);
	const randomIndexes = generateRandomIndexes(hideCount, totalCount);

  for (let i = 0; i < randomIndexes.length; ++i){
  	hideList.push(pokemonList[randomIndexes[i]]);
  }

	if (fs.existsSync(path)) {
		deleteFolderRecursive(path);
	}

	fs.mkdir(path, err =>{
		if (err) throw err;
		createFolder(path, 0, hideList);		
	});
	
	callback(hideList);	
};

const deleteFolderRecursive = (path) => {
  if(fs.existsSync(path)) {
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

const createFolder = (path, i, hideList) => {
	let j = i + 1;
	let name = path + ('0' + j).slice(-2);
	fs.mkdir(name, err => {
		if (err) throw err;		
		if (j < 10)	{
			createFolder(path, j, hideList);	
		}else{
			layOutPokemons(path,  hideList);
		}					
	});
};

const layOutPokemons = (path, hideList) => {
	let randomIndexes = generateRandomIndexes(hideList.length, 10);
	for (let i = 0; i < randomIndexes.length; ++i){
		let j = randomIndexes[i] + 1;
		let folderName = path + ('0' + j).slice(-2);
		let pokemonText = hideList[i].name + '|' + hideList[i].level;
		createPokemonFile(folderName, pokemonText);
	}
}

const createPokemonFile = (path, text) => {
	fs.writeFile(path + '/pokemon.txt', text, 'utf8', err => {
		if (err) throw err;	
	})
};

const generateRandomIndexes = (hideCount, totalCount) => {
	let randomIndexes = new Array();
	for (let i = 0; i < hideCount; ++i){
		let idx = -1;
		let randomIndex = 0;
		do
		{
			randomIndex = random(0, totalCount - 1);
			idx = randomIndexes.indexOf(randomIndex);
		}	
		while(idx != -1);
    randomIndexes.push(randomIndex);
	}
	return randomIndexes;
};

const readPokemonDir = (path) => {	
	let promise = new Promise(function(resolve, reject){
		if(fs.existsSync(path)) {
			fs.readdir(path, (err, items) => {
				if (err) throw err;	
				let filesToRead = new Array();
		    for (let i = 0; i < items.length; ++i){
		    	let pokemonPath = path + items[i] +'/pokemon.txt';
			  	if (fs.existsSync(pokemonPath)){		  		
						filesToRead.push(pokemonPath);						
			  	}
		    }
		    resolve(filesToRead);
			})
		}
	});
	return promise;
};

const readPokemonFiles = (filesToRead) => {
	const seekList = new PokemonList();
	let promise = new Promise(function(resolve, reject){
		for (let i = 0; i < filesToRead.length; ++i){
			let contents = fs.readFileSync(filesToRead[i], 'utf8');
			let pokemonInfo = contents.split('|');
			seekList.add(pokemonInfo[0], pokemonInfo[1]);	
		}
		resolve(seekList);
	});
	return promise;
};

const printSeekList = (seekList) => {
	seekList.show();
};

const seek = (path) =>{
	readPokemonDir(path)
		.then(readPokemonFiles)
		.then(printSeekList);
}

module.exports = {
	hide,
	seek
};

