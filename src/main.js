// Тут пиши JavaScript свого домашнього завдання.
// Додаткові модулі створюй поруч у src/ і імпортуй їх сюди:
import { PREP_TIME } from './js/menu.js';

const form = document.querySelector('.form');
const list = document.querySelector('.order-log');
const select = document.querySelector('select');


const makeOrder = (delay, shouldResolve) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve === 'fulfilled') {
                resolve(delay);
            }

            else {
                reject(delay);
            }
        }, delay)
    })
}

const addOrderRow = (drinkName) => {
    const li = document.createElement('li');
    li.classList.add('row-pending');
    li.textContent = `⏳${drinkName} · у роботі…`;
    list.append (li);
    return li;
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const selectedItems = {
        drinkName: data.get('drink'),
        state: data.get('state'),

    }
    const item = addOrderRow(selectedItems.drinkName);
    makeOrder(PREP_TIME[`${selectedItems.drinkName}`], selectedItems.state).then(delay => {
        item.classList.remove('row-pending');
        item.classList.add('row-ok');
        item.textContent = `✅${select.value} · готове · ${delay}ms`
    }).catch(delay => {
        item.classList.remove('row-pending');
        item.classList.add('row-err');
        item.textContent = `❌${select.value} · скасовано · ${delay}ms`
    })

})

