import shoppingCartImg from "./img/shopping-cart.svg";

const apiURL = "https://www.mamezi.pl/praca/front/products/data.json";

const productsContainer = document.querySelector("#products");

const amountButtons = {
  btn2: {
    element: document.querySelector("#btn-count2"),
    count: 2,
  },
  btn4: {
    element: document.querySelector("#btn-count4"),
    count: 4,
  },
  btn8: {
    element: document.querySelector("#btn-count8"),
    count: 8,
  },
};

let activeAmountButton = amountButtons.btn4;
activeAmountButton.element.classList.add("active");

Object.entries(amountButtons).forEach(([key, val]) => {
  val.element.addEventListener("click", () => {
    activeAmountButton.element.classList.remove("active");
    val.element.classList.add("active");
    activeAmountButton = val;
    displayProducts();
  });
});

let products = [];

async function start() {
  products = await getProducts();
  displayProducts();
}
start();

async function getProducts() {
  const response = await fetch(apiURL);
  const jsonData = await response.json();
  return jsonData.list;
}

function getProductPhoto(imgID) {
  return `https://www.mamezi.pl/praca/front/products/upload/${imgID}.png`;
}

function getProductCount(availabilityName) {
  if (availabilityName === "brak towaru") {
    return 0;
  }
  if (availabilityName === "ostatnia sztuka!") {
    return 1;
  }
  if (availabilityName === "mała ilość") {
    return 2;
  }
}

async function displayProducts() {
  productsContainer.innerHTML = "";

  products.slice(0, activeAmountButton.count).forEach((product) => {
    const productTemplate = `
      <a class="product" href="${product.url}" target="_blank">
        <div class="amount-discount">
          <div class="cart">
            <img
              src="${shoppingCartImg}"
              alt="Ikona
                  koszyka"
            />
            <p>sztuk: <span>${getProductCount(
              product.availability.name
            )}</span></p>
          </div>
          <div class="discount">
            <p>oszczędzasz: <span>${
              product.price.gross.base_float - product.price.gross.final_float
            } zł</span></p>
          </div>
        </div>
        <img
          class="img-product"
          src="${getProductPhoto(product.main_image)}"
          alt="Zdjęcie
            produktu"
        />
        <div class="price">
          <p class="new">${product.price.gross.final_float} zł</p>
          <p class="previous">${product.price.gross.base_float} zł</p>
        </div>
        <p class="name">${product.name}</p>
        <p class="producer">${product.producer.name}</p>
      </a>
    `;

    productsContainer.innerHTML += productTemplate;
  });
}
