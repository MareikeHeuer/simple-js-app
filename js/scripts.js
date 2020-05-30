//pokemonList array wrapped inside an IIFE
var pokemonRepository = (function () {
  var pokemonList = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


  //Create a function inside IIFE
  function addListItem(pokemon) {
    //new variable
    var pokemonList = document.querySelector('.pokemon-list');
    //create li element
    var listItem = document.createElement('li');
    //create a button createElement
    var button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button')
    button.addEventListener('click', function() {
      showDetails(pokemon)
    })
    // Add to parents
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }

// Function to show details
function showDetails(item) {
  loadDetails(item).then(function () {
    console.log(item);
  });
}

  //Function to add Pokemon to the Pokemon list
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  //Function to get all the Pokemons
  function getAll() {
    return pokemonList;
  }

  function loadDetails(item) {
  var url = item.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    // Now we add the details to the item
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
  }).catch(function (e) {
    console.error(e);
  });
}



  //Return functions to add and get all the Pokemons
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
