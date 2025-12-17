const refreshBtn = document.getElementById("refresh-btn");
refreshBtn.addEventListener("click", function () {
  window.location.reload();
});
let products = [];
let filteredProducts = [];
const fetchdata = async () => {
  try {
    const response = await fetch("https://dummyjson.com/carts/19");
    const data = await response.json();
    products = data.products;
    filteredProducts = products;
    renderProducts(filteredProducts);
  } catch (error) {
    console.log(error);
  }
};
fetchdata();
const searchField = document.getElementById("search");
searchField.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filteredList = filteredProducts.filter((item) =>
    item.title.toLowerCase().includes(value)
  );

  renderProducts(filteredList);
});

const renderProducts = (productsList) => {
  const productsListContainer = document.getElementById("products-list");
  productsListContainer.innerHTML = "";
  productsList.forEach((product) => {
    const { title, price, quantity, thumbnail } = product;
    const totalPrice = price * quantity;
    const productDiv = document.createElement("div");
    productDiv.innerHTML = `
        <img src='${thumbnail}' alt="${title}">
        <div>
        <h3>${title}</h3>
        <p>${price}$</p>
        <p>${quantity}</p>
        <p>${totalPrice}$</p>
        </div>
        `;
    const xBtn = document.createElement("button");
    xBtn.textContent = "x";
    xBtn.addEventListener("click", () => {
      filteredProducts = filteredProducts.filter((p) => {
        p.id !== product.id;
      });
      renderProducts(filteredProducts);
    });
    productDiv.append(xBtn);
    const increaseBtn = document.createElement("button");
    increaseBtn.textContent = "+";
    const decreaseBtn = document.createElement("button");
    decreaseBtn.textContent = "-";
    increaseBtn.addEventListener("click", () => {
      product.quantity++;
      renderProducts(filteredProducts);
    });
    decreaseBtn.addEventListener("click", () => {
      product.quantity--;
      if (product.quantity == 0) {
        filteredProducts = filteredProducts.filter((p) => {
          return p.id !== product.id;
        })
      }
      renderProducts(filteredProducts);
    });
    xBtn.style.backgroundColor = "transparent";
    xBtn.style.color = "red";
    xBtn.style.height = "30px";
    xBtn.style.width = "30px";
    productDiv.style.display = "flex";
    productDiv.style.alignItems = "center";
    productDiv.append(decreaseBtn);
    productDiv.append(increaseBtn);
    productsListContainer.append(productDiv);
  });
};
