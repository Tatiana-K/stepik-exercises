var checkboxItem = document.querySelectorAll('input[type="checkbox"]');
var numberItem = document.querySelectorAll('.orderItem.number');
var itemBlock = document.querySelectorAll('.item');
var resultPrice = document.querySelector('.span__result');
var resultBtn = document.querySelector('.btn__result');
var inputSurname = document.querySelector('.inputText.surname');
var inputName = document.querySelector('.inputText.name');
var result = {
    name: [],
    price: [],
    quantity: []
}
var res = 0;
var timeout = null;

itemBlock.forEach(elem => {
    elem.children[0].addEventListener('click', function() {
        let indName = result.name.indexOf(elem.children[0].dataset.name);
        let indPrice = result.price.indexOf(elem.children[0].dataset.price);
        if(elem.children[0].checked) {
            elem.children[2].removeAttribute("disabled");
            elem.children[2].value = 1;
            result.price.push(elem.children[0].dataset.price);
            result.name.push(elem.children[0].dataset.name);
            result.quantity.push(1);
            console.log(`result forEach:`);
            console.log(result);
        } else {
            elem.children[2].value = 0;
            elem.children[2].setAttribute("disabled", true);
            result.price.splice(indPrice, 1);
            result.name.splice(indName, 1);
            result.quantity.splice(indPrice,1);
            console.log(`result forEach else:`);
            console.log(result);
        }

        let len = result.name.length;
        res = 0;
        resultPrice.textContent = 0;
        for (let i=0; i<len; i++){
            res += parseInt(result.price[i]) * parseInt(result.quantity[i]);
        }
        resultPrice.textContent = res;
        console.log(`result forEach total:`);
        console.log(result);
    });

    elem.children[2].addEventListener('input', function() {
        let indName = result.name.indexOf(elem.children[0].dataset.name);
        let indPrice = result.price.indexOf(elem.children[0].dataset.price);
        clearTimeout(timeout);
        setTimeout(function() {
            if(elem.children[2].value > 0) {
                result.quantity[indName] = parseInt(elem.children[2].value);
            } else {
                elem.children[2].value = 0;
                elem.children[0].checked = false;
                elem.children[2].setAttribute("disabled", true);
                result.quantity.splice(indName, 1);
                result.name.splice(indName, 1);
                result.price.splice(indName, 1);
            }

            let len = result.name.length;
            res = 0;
            resultPrice.textContent = 0;
            for (let i=0; i<len; i++){
                res += parseInt(result.price[i]) * parseInt(result.quantity[i]);
            }
            resultPrice.textContent = res;
        }, 1500);
        console.log(`result number total:`);
        console.log(result);
    });
});

resultBtn.addEventListener('click', function() {
    let order = []; 
    for (let i=0; i<result.name.length; i++) {
        order.push(result.name[i] + ' - (' + result.quantity[i] + ') - ' + result.quantity[i]*result.price[i]);
        console.log(order);
    }
    let name = inputName.value !== '' || inputSurname.value !== '' ? `${inputSurname.value} ${inputName.value}` : 'empty';
    alert(`Клиент: ${name}\nЗаказ: \n${order.join('\n')}\nИтого: ${res}р.`)
});