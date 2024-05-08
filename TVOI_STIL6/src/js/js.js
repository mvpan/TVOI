import axios from "axios";
import { myCart, cartNum, Product } from "./cart";

const productsContaine = document.getElementById("productsContainer");
const bodyModal = document.body;
const URL = "http://localhost:8080";
const h1Element = document.querySelector("h1.mm");
const idEl = h1Element.id;

import { hideLoader } from "./loader.js";

window.addEventListener("load", function () {
  hideLoader(); // Вызов функции hideLoader() после полной загрузки страницы
});

axios
  .get(`${URL}/api/catalog/${idEl}`)
  .then((response) => {
    const bd = response.data;

    // Пройти по каждому объекту в массиве `bd` и создать элементы для каждого продукта
    bd.forEach((product) => {
      // Создать элемент для продукта
      const productElement = document.createElement("div");
      productElement.setAttribute("data-id", `${product.id}`);
      productElement.classList.add("main__item");
      productElement.classList.add("item");

      // Создать HTML-разметку продукта с данными из объекта `product`
      productElement.innerHTML = `
      <div class="main__card" data-id=${product.id}>
        <img fetchpriority="high" src="${URL}/${product.art}/${product.img_urls[0]}" alt="${product.name} "width="300px" hight="300px" class="main__item--image item__img" />
        <div class="main__item--text">
          <p class="card__title title">${product.name}</p>
          <h4 class="card__price price">${product.price}</h4>
          <p><strong>Бренд:</strong> ${product.mater}</p>
          <p><strong>Цвет:</strong> ${product.color}</p>
          <p><strong>Артикул:</strong> ${product.art}</p>
          <p><strong>Описание:</strong> ${product.text}</p>
        </div>
        </div>
        <button class="card__add">В корзину</button>
      
      `;

      // Добавить созданный элемент продукта в контейнер
      productsContaine.appendChild(productElement);
    });

    const cardAddArr = Array.from(document.querySelectorAll(".card__add"));
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    cartNum.textContent = myCart.count;
    myCart.products = cardAddArr.forEach((cardAdd) => {
      cardAdd.addEventListener("click", (e) => {
        e.preventDefault();
        const card = e.target.closest(".item");
        const product = new Product(card);
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        myCart.products = savedCart.products;
        myCart.addProduct(product);
        localStorage.setItem("cart", JSON.stringify(myCart));
        cartNum.textContent = myCart.count;
      });
    });

    // Находим все блоки с классом main__item
    const mainItems = document.querySelectorAll(".main__card");

    // Добавляем обработчик события клика на каждый блок main__item
    mainItems.forEach((item) => {
      item.addEventListener("click", () => {
        const itemId = parseInt(item.getAttribute("data-id"));
        openModal(itemId);
      });
    });
  })
  .catch((error) => {
    console.error(error);
  });
// Функция для открытия модального окна по id
function openModal(id) {
  // Получить данные о продукте из базы данных на сервере
  axios
    .get(`${URL}/api/product/${id} `)
    .then((response) => {
      const product = response.data;
      const modal = document.getElementById("myModal");
      const modalImg = document.getElementById("modalImg");
      const modalName = document.getElementById("modalName");
      const modalBrand = document.getElementById("modalBrand");
      const modalPrice = document.getElementById("modalPrice");
      const modalAtribut = document.getElementById("modalAtribut");

      // Заполнить модальное окно данными из найденного продукта
      modalImg.src = ` http://localhost:8080/${product.art}/${product.img_urls[0]}`;
      modalImg.alt = product.name;
      modalName.textContent = product.name;
      modalPrice.textContent = product.price;

      modalBrand.textContent = `Материал: ${product.mater}`;
      modalAtribut.textContent = `Артикул: ${product.art}`;

      modal.style.display = "block"; // Отобразить модальное окно
      bodyModal.classList.add("lock");
    })
    .catch((error) => {
      console.error(error);
    });
}
const closeModalBtn = document.querySelector(".close");

closeModalBtn.addEventListener("click", closeModal);

// Функция для закрытия модального окна по id
function closeModal() {
  const modal = document.getElementById("myModal");
  console.log(modal);
  modal.style.display = "none";
  bodyModal.classList.remove("lock");
}
