// List of Pokemons from heaviest weight to lightest weight

var pokemonList = [

  {
    name: 'Spheal',
    heightInMeters: 0.8,
    weightInKg: 39.5,
    abilities: ['oblivious', 'thick-fat', 'ice-body']
  },


  {
    name: 'Togekiss',
    heightInMeters: 1.5,
    weightInKg: 38,
    abilities: ['serene-grace', 'hustle', 'super-luck']
  },

  {
    name: 'Happiny',
    heightInMeters: 0.6,
    weightInKg: 24.4,
    abilities: ['natural-cure', 'serene-grace', 'friend-guard']
  },

  {
    name: 'Teddiursa',
    heightInMeters: 0.6,
    weightInKg: 8.8,
    abilities: ['pickup', 'quick-feet', 'honey-gather']
  },

  {
    name: 'Pikachu',
    heightInMeters: 0.4,
    weightInKg: 6,
    abilities: ['static', 'lightningrod']
  },

  {
    name: 'Jigglypuff',
    heightInMeters: 0.5,
    weightInKg: 5.5,
    abilities: ['cute-charm', 'friend-guard']
  },

  {
    name: 'Minun',
    heightInMeters: 0.4,
    weightInKg: 4.2,
    abilities: ['minus']
  },

  {
    name: 'Cherubi',
    heightInMeters: 0.4,
    weightInKg: 3.3,
    abilities: ['chlorophyll']
  }
]

//var myFavoritePokemon = pokemonList[7];
/*for (var i = 0; i < pokemonList.length; i++) {
  var pokemon = pokemonList[i];*/


function pokemonAttributesList(pokemon) {
  //display pokemon names and height in each line with <div> element
  document.write(
    "<div class='pokemon'><div class='pokemon-name'>" + pokemon.name +
    "</div><div class='pokemon-height'>(height: " + pokemon.heightInMeters +
    ")</div>"
  );
  //dispaly "wow, that's big" next to all pokemons whose height is bigger than 1 meter
  if (pokemon.heightInMeters > 1.0) {
    document.write("<div>Wow, that's big</div>");
  }
  document.write("</div>");
}
pokemonList.forEach(pokemonAttributesList);
