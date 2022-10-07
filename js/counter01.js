// Создаем элементы на странице Минус-Плюс и счетчик
// Находим кнопки Минус-Плюс
//

const btnMinus = document.querySelector('[data-action="minus"]');
const btnPlus = document.querySelector('[data-action="plus"]');

// Создаем переменную счетчика
const counter = document.querySelector('[data-counter]');

// Отслеживаем клик по кнопкам Минус-Плюс

btnMinus.addEventListener('click', function() {
    // Находим цифру (количество - счетчик) на странице и уменьшаем ее
    // Проверяем что бы счетчик был больше чем 1
    if (parseInt(counter.innerText) > 1) {
        // Изменяем текст в счетчике на 1
        counter.innerText = --counter.innerText;
    }

})

btnPlus.addEventListener('click', function() {
    // Находим цифру (количество - счетчик) на странице и увеличиваем ее
    counter.innerText = ++counter.innerText;
})


