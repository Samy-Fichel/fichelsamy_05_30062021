//récuperer la chaîne de requête dans l'url
const stringId_url = window.location.search;


//Extraction de l'id en utilisant la méthode du constructeur URLSearchParams()
const urlSearchParams = new URLSearchParams(stringId_url);

const id = urlSearchParams.get("id");


getServerTeddy(id);

function getServerTeddy(teddyId) {
  fetch(`http://localhost:3000/api/teddies/${teddyId}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {

      displayHTMLTeddy(value);
    })
    .catch(function (err) {
      displayError(err);
    });
}

function displayHTMLTeddy(teddy) {
  const nameElement = document.getElementById("name");
  const priceElement = document.getElementById("price");
  const imgElement = document.getElementById("img");
  const descriptionElement = document.getElementById("description");
  const colorsElement = document.getElementById("colors");
  nameElement.innerHTML = teddy.name;
  priceElement.innerHTML = `${teddy.price / 100}.00 €`;
  imgElement.setAttribute("src", teddy.imageUrl);
  descriptionElement.innerHTML = teddy.description;

  let colors = teddy.colors;

  let colorsOptions = "";

  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];

    colorsOptions += `<option value="${color}">${color}</option>`;
  }

  colorsElement.innerHTML = `<select id="choice_product">
    ${colorsOptions}
  </select>
  `;
  //select + boucle pour afficher les couleurs 

  //Selection de l'id form des colors des teddies
  const formId = document.querySelector("#choice_product");


  //Mettre le produit choisi par l'utilisateur dans une variable
  const choiceForm = formId.value;


  //Selection du bouton Ajouter l'article au panier
  const sendBasket = document.getElementById("btn-basket");
  
  //Ecouter le bouton et envoyer le panier
  sendBasket.addEventListener("click", (event) => {
    event.preventDefault();
    addProductToBasket(teddy);
    
  });

};

function addProductToBasket(product){
  let panierLocalstorage = localStorage.getItem("panier") // Récupère le panier qui et en string
  let panier = JSON.parse(panierLocalstorage) // Parse le panier pour le transformer de string vers JavaScript
  let selectColorElement = document.getElementById("choice_product")
    if (panier == null) {
      panier = [];
    }
    panier.push({ price: product.price, name: product.name, imageUrl: product.imageUrl, _id: product._id, color: selectColorElement.value })
 
    localStorage.setItem("panier", JSON.stringify(panier));
    alert("Mémorisation effectuée");
}