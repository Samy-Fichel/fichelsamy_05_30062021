//Déclaration variable pour mettre la key et les values qui sont dans le localStorage
let productsLocalStorage = JSON.parse(localStorage.getItem("panier"));
console.log(productsLocalStorage); 

//*******************AFFICHAGE DES PRODUITS DU PANIER ******************************************************

//Injecter le code HTML
const ElementHtml = document.getElementById("appPanier");
console.log(ElementHtml);

//si panier et vide : affiche panier vide, si panier pas vide aficher les products qui sont dans le localStorage

if(productsLocalStorage === null){
const basketEmpty = `
  <div class="container-empty-basket">
    <div class="basket-empty">VOTRE PANIER EST VIDE</div>
  </div>
`;
 ElementHtml.innerHTML = basketEmpty;

}else{
  //si panier n'est pas vide : afficher les products qui sont dans le localStorage
   let arrayProductsBasket = [];

   for(i = 0; i < productsLocalStorage.length; i++ ){
    arrayProductsBasket = arrayProductsBasket + `
  <div class = "container-basket-products">
    <table>
        <tr class="denomination-names">
          <td>Nom</td>
          <td>Prix</td>
          <td>Id</td>
          <td>Image</td>
        </tr>
        <tr>
          <td>${productsLocalStorage[i].name}</td>
          <td>${productsLocalStorage[i].price /100}.00€</td>
          <td>${productsLocalStorage[i]._id}</td>
          <td><img src=${productsLocalStorage[i].imageUrl} width='100' height='70' /></td>
        </tr>
    </table>
  </div>
    `;
   }
    if(i === productsLocalStorage.length){
    //injection html dans la page panier
    ElementHtml.innerHTML = arrayProductsBasket;
   }

}