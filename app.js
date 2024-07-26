let tg = window.Telegram.WebApp;
let selectedItem = {};

tg.expand(); // расширяем на весь экран сайт

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let btns = document.querySelectorAll('button'); // получаем все кнопки

btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let itemId = e.target.id;
    if (selectedItem[itemId]) {
      // если товар уже выбран, то удаляем его из списка
      delete selectedItem[itemId];
      btn.textContent = 'Add';
      btn.style.backgroundColor = '';
      btn.style.color = '';
    } else {
      // если товар не выбран, то добавляем его в список
      selectedItem[itemId] = `Товар ${itemId}`;
      btn.textContent = 'Выбрано';
      btn.style.backgroundColor = '#2cab37';
      btn.style.color = '#FFFFFF';
    }
    tg.MainButton.setText(`Выбрано ${Object.keys(selectedItem).length} товаров`);
    tg.MainButton.show();
  });
});

Telegram.WebApp.onEvent("mainButtonClicked", function(){
  let jsonData = JSON.stringify(selectedItem);
  tg.sendData(jsonData);
});

let usercard = document.getElementById("usercard");

let p = document.createElement("p");

p.innerText = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name}`;

usercard.appendChild(p);
