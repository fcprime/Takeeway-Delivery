
// После нажатия add to card, card-item__current должен показывать количество в header__cart-qty
function calcCartPrice() {

    const cardItems = document.querySelectorAll('.card-item');
    const cardTotalPrice = document.querySelector('.card-total__price--all');
    const deliveryCost = document.querySelector('.card-total__price');
    let totalPrice = 0;
    const numberCard = document.querySelector('.header__cart-qty');
    let price = 0;
    
    cardItems.forEach(function (item) {
        
        // Создаем переменные для количества и стоимости
        const amountEl = item.querySelector('[data-counter]');
        const priceEl = item.querySelector('.card-item__price');
        // Считаем стоимость, умножаем количество на цену
        const currentPrice = Math.floor(parseFloat(amountEl.innerText) * 100) / 100 * Math.floor(parseFloat(priceEl.innerText) * 100) / 100;
        // Добавление товара в корзину
        const priceNumber = Math.floor(parseFloat(amountEl.innerText) * 100) / 100;

        // Рассчитываем общую стоимость заказа
        totalPrice += currentPrice;
        price += priceNumber
        numberCard.innerText = price;
    })

    // Отображаем цену на странице
    cardTotalPrice.innerText = totalPrice;

    if (totalPrice >= 40) {
        deliveryCost.classList.add('free');
        deliveryCost.innerText = 'Free'
    } else {
        deliveryCost.classList.remove('free');
        deliveryCost.innerText = '4.99';
    }
}


function toggleCartStatus() {
    
    const cardWrapper = document.querySelector('.card-wrapper');
    const cardEmpty = document.querySelector('[data-cart-empty]');
    const orderForm = document.querySelector('#order-form');
    const deliveryBox = document.querySelector('#card-delivery');

    if (cardWrapper.children.length > 0) {
        cardEmpty.classList.add('none');
        orderForm.classList.remove('none');
        deliveryBox.classList.remove('none');

    } else  {
        cardEmpty.classList.remove('none');
        orderForm.classList.add('none');
        deliveryBox.classList.add('none');
    }
}

// div внутри корзины, в который мы добавляем товар
const cardInner = document.querySelector('.card-wrapper');


// Добавляем прослушку на всем окне
window.addEventListener('click', function (event) {
    
    // Обьявляем переменную для счетчикак
    let counter;

    // Проверяем что клик был совершен по кнопке Добавить в корзину
    if (event.target.hasAttribute('data-cart')) {

        // Находим карточку с товаром внутри которой был совершен клик
        const card = event.target.closest('.product__menu');

        // Собираем данные с этого товара и записываем их в единый обьект
        const productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector('.product__menu-img').getAttribute('src'),
            title: card.querySelector('.product__menu-name').innerText,
            price: card.querySelector('.product__menu-price').innerText,
            counter: card.querySelector('[data-counter]').innerText,
        };

        // Проверять есть ли уже такой товар в корзине
        const itemInCart = cardInner.querySelector(`[data-id="${productInfo.id}"]`);

        // Если товар есть в корзине
        if(itemInCart) {
            const counterEl = itemInCart.querySelector('[data-counter]');
            counterEl.innerText = parseInt(counterEl.innerText) + parseInt(productInfo.counter);
        } else {
            // Если товара нет в корзине

            // Собранные данные подставим в шаблон для товара в корзине
            const cartItemHTML = `<div class="card-item" data-id="${productInfo.id}">
        <div class="card-item__top">
            <div class="card-item__img">
                <img src="${productInfo.imgSrc}" alt="product icon">
            </div>
            <div class="card-item__descr">
                <div class="card-item__box">
                    <div class="card-item__title">${productInfo.title}</div>
                    <div class="card-item__price">${productInfo.price}</div>
                </div>
                <div class="card-item__qty">
                    <div class="card-item__counter card__wrapper">
                        <div class="card-item__control" data-action="minus">
                            -</div>
                        <div class="card-item__current" data-counter>${productInfo.counter}</div>
                        <div class="card-item__control" data-action="plus">+</div>
                    </div>
                    <button data-remove class="card-item__btn">Remove</button>
                </div>
            </div>
        </div>
             </div>`;

            // Отобразим товар в корзине
            cardInner.insertAdjacentHTML('beforeend', cartItemHTML);
        }

        // Сбрасываем счетчик товара на "1"
        card.querySelector('[data-counter]').innerText = '1';

        // Отображение статуса корзины Пустая / Полная
        toggleCartStatus();

        // Пересчет общей стоимости товаров
        calcCartPrice();

    }

    // Проверяем клик строго по кнопкам Плюс либо Минус
    if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
        // Находим обертку счетчика
        const counterWrapper = event.target.closest('.card__wrapper');
        // находим div с числом счетчика
        counter = counterWrapper.querySelector('[data-counter]');
    }


    // Проверяем является ли элемент по которому был совершен клик, кнопкой Плюс
    if (event.target.dataset.action === 'plus') {
        counter.innerText = ++counter.innerText;
    }

    // Проверяем является ли элемент по которому был совершен клик, кнопкой Минус
    if (event.target.dataset.action === 'minus') {

        if (parseInt(counter.innerText) > 1) {
            // Изменяем текст в счетчике на 1
            counter.innerText = --counter.innerText;
        } else if (event.target.closest('.card-wrapper') && parseInt(counter.innerText) === 1) {

            // Удаляем товар из корзины
            event.target.closest('.card-item').remove();
            toggleCartStatus();
            // Пересчет общей стоимости товаров в корзине
            calcCartPrice();
        }   
    }    

    // Проверяем клик по кнопе Remove и удаляем блок элемента
    if (event.target.hasAttribute('data-remove')) {
        event.target.closest('.card-item').remove();
        toggleCartStatus();
        // Пересчет общей стоимости товаров в корзине
        calcCartPrice();
    }

    // Проверяем клик на + или - в корзине
    if (event.target.hasAttribute('data-action') && event.target.closest('.card-wrapper')) {

        // Пересчет общей стоимости товаров в корзине
        calcCartPrice();
    }
});


const btnShowMoreCards = document.querySelector('.product__full');
const hiddenCards = document.querySelector('.card__more');

btnShowMoreCards.addEventListener('click', function () {
    hiddenCards.classList.remove('card__more');
})

// Показать или Скрывать корзину по клику на нее
document.querySelector('.header__cart').onclick = function() {
    document.querySelector('.card').classList.toggle('none');
}

// TAB - переключение между вкладок
const tab = function () {
    let tabItem = document.querySelectorAll('.product__tab');
    let tabContent = document.querySelectorAll('.product__content');
    let tabName;

    tabItem.forEach(item => {
        item.addEventListener('click', selectTab)
    })
    function selectTab() {
        tabItem.forEach(item => {
            item.classList.remove('is-active')
        });
        this.classList.add('is-active');
        tabName = this.getAttribute('data-tab-name');
        selectTabContent(tabName)
    }
    function selectTabContent(tabName) {
        tabContent.forEach(item => {
            item.classList.contains(tabName)? item.classList.add('is-active'): item.classList.remove('is-active');
        })
    }
}
tab();

// Input mask

let phone = document.getElementById('phone-mask');
let phoneMask = {
    mask: '+48 000-000-000',
    lasy: false,
}
let mask = new IMask(phone, phoneMask);

// Создаем кнопку menu btn, добавляем класс для появления menu и переворота icon
document.querySelector('.menu__button').onclick = function() {
    document.querySelector('.header__list').classList.toggle('header__list--active');
    document.querySelector('.menu__button').classList.toggle('menu__button--active');
    document.querySelector('.header__items-title').classList.toggle('title-active');
}

document.querySelector('.footer__item-btn--company').onclick = function() {
    document.querySelector('.footer__list').classList.toggle('footer__list-company--active');
}

document.querySelector('.footer__item-btn--template').onclick = function() {
    document.querySelector('.footer__list-template').classList.toggle('footer__list-template--active');
}

document.querySelector('.footer__item-btn--flowbase').onclick = function() {
    document.querySelector('.footer__list-flowbase').classList.toggle('footer__list-flowbase--active');
}