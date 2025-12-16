const refreshBtn = document.getElementById("refresh-btn");
refreshBtn.addEventListener("click", function () {
  window.location.reload();
});
let products = [];
let filteredProducts = [];
const fetchdata = async () => {
  try {
    const response = await fetch("https://dummyjson.com/carts/13");
    const data = await response.json();
    products = data.products;
    filteredProducts = products;
    renderProducts(filteredProducts);
  } catch (error) {
    console.log(error);
  }
};
fetchdata();

const renderProducts = (productsList) => {
    const productsListContainer = document.getElementById("products-list");
    productsListContainer.innerHTML = "";
    productsList.forEach((product) => {
        const { title, price, quantity, total, thumbnail} = product;
        const productDiv = document.createElement("div");
        productDiv.innerHTML = `
        <img src='${thumbnail}' alt="${title}">
        <h3>${title}</h3>
        <p>${price}</p>
        <p>${quantity}</p>
        <p>${total}</p>
        `;
        productDiv.style.display = "flex";
        productsListContainer.append(productDiv);
    });
};
