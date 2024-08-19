document.getElementById('burger').onclick = function () {
    document.getElementById('menu').classList.add('open');
}

document.querySelectorAll('#menu *').forEach((item) => {
    item.onclick = () => {
        document.getElementById('menu').classList.remove('open');
    }
})

let orderMacaroon = $('#orderMacaroon');
let modal = $('#modal');
let loader = $('.loader');

$('#submit').click(function () {
    let name = $('#name');
    let firstName = $('#firstName');
    let number = $('#number');
    let flag = false;

    $('.error-input').hide();
    name.css('border', '1px solid #821328');
    if (!name.val()) {
        name.css('border', '2px solid red');
        name.next().show();
        flag = true;
    }
    firstName.css('border', '1px solid #821328');
    if (!firstName.val()) {
        firstName.css('border', '2px solid red');
        firstName.next().show();
        flag = true;
    }
    number.css('border', '1px solid #821328');
    if (!number.val()) {
        number.css('border', '2px solid red');
        number.next().show();
        flag = true;
    }
    if (!flag) {
        loader.css('display', 'flex');
        $.ajax({
            method: "POST",
            url: "https://testologia.ru/checkout",
            data: {name: name.val(), firstName: firstName.val(), number: number.val()}
        })
            .done(function (msg) {
                loader.hide();
                console.log(msg);
                if (msg.success) {
                    orderMacaroon.css('display', 'none');
                    modal.css('display', 'flex'); 

                } else {
                    alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ!")
                }
            });
    }
});