import axios from "axios";

const TOKEN = "6601397583:AAE9Qq3k0toWqXV4jjr10d-Fr_QjmsHBoGM";
const CHAT_ID = "-1002092433013";
const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

const body2 = document.body;
const popup2 = document.querySelector(".popup");

// function closePopup(lll, bodyClass) {
//   lll.classList.remove("popup--open");
//   bodyClass.classList.remove("lock");
// }
function closePopup(lll, bodyClass) {
  lll.classList.remove("popup--open");
  bodyClass.classList.remove("lock");
}

document.getElementById("tg").addEventListener("submit", function (e) {
  e.preventDefault();

  let message = `<b>Заявка с сайта!</b>\n`;
  message += `<b>Отправитель: </b> ${this.name.value}\n`;
  message += `<b>Почта: </b> ${this.email.value}\n`;

  // Получить товары из корзины
  const savedCart = JSON.parse(localStorage.getItem("cart"));
  const products = savedCart.products;

  // Добавить товары в сообщение
  if (products.length > 0) {
    message += "<b>Товары в корзине:</b>\n";
    products.forEach((product, index) => {
      message += `<b>${index + 1}. </b>${product.name} - ${toCurrency(
        toNum(product.price)
      )}\n`;
    });
    message += `<b>Итого: </b> ${toCurrency(myCart.cost)}\n`;
  } else {
    message += "<b>Товары в корзине:</b> Пусто\n";
  }

  axios
    .post(URL_API, {
      chat_id: CHAT_ID,
      parse_mode: "html",
      text: message,
    })
    .then(() => {
      localStorage.removeItem("cart");
      console.log("Данные корзины удалены из localStorage.");

      const cartNum = document.querySelector("#cart_num");
      cartNum.textContent = 0;

      closePopup(popup2, body2);

      // location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
});
