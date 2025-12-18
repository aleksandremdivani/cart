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

  const filteredList = products.filter((item) =>
    item.title.toLowerCase().includes(value)
  );

  renderProducts(filteredList);
});
const cartSum = document.getElementById("cart-summary");

const updateCartSummary = () => {
  cartSum.innerHTML = "<h2>Cart Summary</h2>";
  const totalProducts = filteredProducts.length;
  const totalQuantity = filteredProducts.reduce((acc, current) => {
    return acc + current.quantity;
  }, 0);
  const productsTotalPrice = filteredProducts.reduce((acc, current) => {
    return acc + current.price * current.quantity;
  }, 0);
  const totalProductsEL = document.createElement("li");
  totalProductsEL.textContent = "Total Products:" + totalProducts;
  const totalQuantityEL = document.createElement("li");
  totalQuantityEL.textContent = "Total quantity:" + totalQuantity;
  const productsTotalPriceEL = document.createElement("li");
  productsTotalPriceEL.textContent =
    "Total Products:" + productsTotalPrice + "$";
    cartSum.style.listStyle = "none";
    cartSum.style.display = "flex";
    cartSum.style.flexDirection = "column";
    cartSum.style.rowGap = "40px";
  cartSum.append(totalProductsEL);
  cartSum.append(totalQuantityEL);
  cartSum.append(productsTotalPriceEL);
};
const renderProducts = (productsList) => {
  const productsListContainer = document.getElementById("products-list");
  productsListContainer.innerHTML = "";
  productsList.forEach((product) => {
    const { title, price, quantity, thumbnail } = product;
    const totalPrice = price * quantity;
    const productDiv = document.createElement("div");
    const quantityEl = document.createElement("p");
    quantityEl.textContent = quantity;
    const orderDetails = document.createElement("div");
    const pTitle = document.createElement("h3");
    pTitle.textContent = title;
    const pPrice = document.createElement("p");
    pPrice.textContent = price + "$";
    const pTotal = document.createElement("p");
    pTotal.textContent = totalPrice + "$";
    productDiv.innerHTML = `
        <img src='${thumbnail}' alt="${title}">
        `;
    // <div>
    // <h3>${title}</h3>
    // <p>${price}$</p>
    // <p>${totalPrice}$</p>
    // </div>
    orderDetails.prepend(pTitle);
    orderDetails.append(pPrice);
    orderDetails.append(quantityEl);
    orderDetails.append(pTotal);

    const xBtn = document.createElement("button");
    xBtn.textContent = "x";
    xBtn.addEventListener("click", () => {
      filteredProducts = filteredProducts.filter((p) => {
        return p.id !== product.id;
      });
      renderProducts(filteredProducts);
    });
    const increaseBtn = document.createElement("button");
    increaseBtn.textContent = "+";
    const decreaseBtn = document.createElement("button");
    decreaseBtn.textContent = "-";
    increaseBtn.addEventListener("click", () => {
      product.quantity++;
      quantityEl.textContent = product.quantity;
      pTotal.textContent = product.quantity * price + "$";
      updateCartSummary();
    });
    decreaseBtn.addEventListener("click", () => {
      product.quantity--;
      quantityEl.textContent = product.quantity;
      pTotal.textContent = product.quantity * price + "$";
      updateCartSummary();
      if (product.quantity === 0) {
        filteredProducts = filteredProducts.filter((p) => {
          return p.id !== product.id;
        });
        renderProducts(filteredProducts);
      }
    });
    xBtn.style.backgroundColor = "transparent";
    xBtn.style.color = "red";
    xBtn.style.height = "30px";
    xBtn.style.width = "30px";
    increaseBtn.style.marginLeft = "8px";
    decreaseBtn.style.marginRight = "8px";
    productDiv.style.display = "flex";
    productDiv.style.alignItems = "center";
    productDiv.append(orderDetails);
    productDiv.append(xBtn);
    quantityEl.prepend(decreaseBtn);
    quantityEl.append(increaseBtn);
    productsListContainer.append(productDiv);
  });
  updateCartSummary();
};
