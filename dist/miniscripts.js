function showModal(e,t){var n=document.querySelector("#modal-container");n.innerHTML="";var o=document.createElement("div");o.classList.add("modal");var i=document.createElement("button");i.classList.add("modal-close"),i.innerText="Close",i.addEventListener("click",hideModal);var a=document.createElement("h1");a.innerText=e;var r=document.createElement("p");r.innerText=t,o.appendChild(i),o.appendChild(a),o.appendChild(r),n.appendChild(o),n.classList.add("is-visible"),window.addEventListener("keydown",e=>{var t=document.querySelector("#modal-container");"Escape"===e.key&&t.classList.contains("is-visible")&&hideModal()}),n.addEventListener("click",e=>{e.target===n&&hideModal()})}var dialogPromiseReject,modalContainer=document.querySelector("#modal-container");function hideModal(){modalContainer.classList.remove("is-visible"),dialogPromiseReject&&(dialogPromiseReject(),dialogPromiseReject=null)}var pokemonRepository=function(){var e=[],t="https://pokeapi.co/api/v2/pokemon/?limit=150";function n(t){e.push(t)}function o(e){var t=e.detailsUrl;return fetch(t).then(function(e){return e.json()}).then(function(t){e.imageUrl=t.sprites.front_default,e.height=t.height,e.types=t.types}).catch(function(e){console.error(e)})}return{add:n,getAll:function(){return e},addListItem:function(e){var t=document.querySelector(".pokemon-list"),n=document.createElement("li"),i=document.createElement("button");i.innerText=e.name,i.classList.add("pokemon-button"),i.addEventListener("click",function(){!function(e){o(e).then(function(){showModal(e.name,"Height: "+e.height);var t=modalContainer.querySelector(".modal"),n=document.createElement("img");n.src=e.imageUrl,t.appendChild(n)})}(e)}),n.appendChild(i),t.appendChild(n)},loadList:function(){return fetch(t).then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){n({name:e.name,detailsUrl:e.url})})}).catch(function(e){console.error(e)})},loadDetails:o}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});
