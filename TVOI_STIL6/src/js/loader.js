export function hideLoader() {
  const body = document.body; // Получаем элемент <body>

  // Находим загрузочный элемент (например, с классом "loader") внутри <body>
  const loader = body.querySelector(".loader");

  // Добавляем класс "loader--hidden" для скрытия загрузочного элемента
  loader.classList.add("loader--hidden");

  // Устанавливаем таймер для окончательного скрытия загрузочного элемента через 500 миллисекунд
  setTimeout(function () {
    loader.style.display = "none"; // Устанавливаем display: none; для элемента loader
  }, 500);
}
