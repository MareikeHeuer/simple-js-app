//pokemonList array wrapped inside an IIFE
function showModal(title, text) {
  var modalContainer = document.querySelector("#modal-container");

  // Clear all existing modal content
  modalContainer.innerHTML = "";

  var modal = document.createElement("div");
  modal.classList.add("modal");

  // Add the new modal content
  /*  var closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";*/

  var closeButtonElement = document.createElement("button");
  closeButtonElement.classList.add("modal-close");
  closeButtonElement.innerText = "Close";
  closeButtonElement.addEventListener("click", hideModal);

  var titleElement = document.createElement("h1");
  titleElement.innerText = title;

  var contentElement = document.createElement("p");
  contentElement.innerText = text;

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);

  modalContainer.classList.add("is-visible");

  window.addEventListener("keydown", (e) => {
    var modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  modalContainer.addEventListener("click", (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    var target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
}


var modalContainer = document.querySelector("#modal-container");

var dialogPromiseReject;

function hideModal() {
  modalContainer.classList.remove("is-visible");
  if (dialogPromiseReject) {
    dialogPromiseReject();
    dialogPromiseReject = null;
  }
}

var pokemonRepository = (function() {
  var pokemonList = [];
  var apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";


  //Create a function inside IIFE
  function addListItem(pokemon) {
    //new variable
    var pokemonList = document.querySelector(".pokemon-list");
    //create li element
    var listItem = document.createElement("li");
    //create a button createElement
    var button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-button")
    button.addEventListener("click", function() {
      showDetails(pokemon)
    })
    // Add to parents
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }

  // Function to show details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon.name, "Height: " + pokemon.height);
      var modal = modalContainer.querySelector(".modal");
      var imageTag = document.createElement("img");
      imageTag.src = pokemon.imageUrl;
      modal.appendChild(imageTag)
    });
  }

  //Function to add Pokemon to the Pokemon list
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  //Function to get all the Pokemons
  function getAll() {
    return pokemonList;
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e) {
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
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
