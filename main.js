import {dataDB} from "./js/data.js";

const contentProduct = document.querySelector(".content_product");
const contentCartBody= document.querySelector(".content_cart-body")


let html="";
let cart={}

dataDB.forEach(({id, name, price, stock, urlImages}) => {
    html +=`
    <div class="muebles">
    <div class="muebles_img">
        <img src="${urlImages}" alt="${name}">
    </div>
    <div class="muebles__body" id="${id}">
        <h2 class="muebles__body-title" > ${name}</h2>
    <p> Precio: ${price}</p>
    <p>Stock:${stock}</p>
    <button class="btn btn__add">Agregar</button>
    </div>
    </div>
    `
});


contentProduct.innerHTML = html;
const iconCart= document.querySelector("#icon_cart");
const contentCart= document.querySelector("#contentCart");

iconCart.addEventListener("click", (e) => {
    contentCart.classList.toggle("content__cart-show")
});

function printFoodInCart() {
    let html="";

    const arrayCart= Object.values(cart);

    arrayCart.forEach(({id, name, urlImages, amount}) => {
        html +=`
        <div class="item_cart">
            <div class="item_cart-img">
            <img src="${urlImages}" alt="">
            </div>

            
            <div class="item_cart-options" id= "${id}">
            <h4 class="item_cart-title"> ${name}</h4>

            <div class="contenedor_opciones">
                <i class='bx bx-message-square-add'></i>
                <span id="amount">${amount}</span>
                <i class='bx bx-comment-minus'></i>
                <i class='bx bx-trash-alt' ></i>
                </div>
            </div>
        </div>
        `;
    });

    contentCartBody.innerHTML= html;

    const carttotal = document.querySelector(".content_cart-total")
        let totaltext = "";
        let totalnumber = 0;
        arrayCart.forEach(({ price, amount}) => {
        let subtotalnumber = price*amount;
        totalnumber += subtotalnumber;
        })
        totaltext += `<h2>Total: $<span id="total">${totalnumber}</span></h2>`;
        carttotal.innerHTML= totaltext;
}

contentProduct.addEventListener(("click"), (e)=> {
    if (e.target.classList.contains("btn__add")) {
        const idProducts= +e.target.parentElement.id;

        const findProducts= dataDB.find((item)=> item.id=== idProducts)

        if(cart[idProducts]){
            alert("este articulo ya fue agregado");

        } else{
            cart[idProducts]= findProducts;
            cart[idProducts].amount=1;
        }

        printFoodInCart();
    }
});

contentCartBody.addEventListener("click", (e)=> {
    if (e.target.classList.contains("bx-comment-minus")) {
        const idProducts= +e.target.parentElement.parentElement.id;
        if(cart[idProducts].amount>1){
            cart[idProducts].amount--;
        }
        
    }
    if (e.target.classList.contains("bx-message-square-add")) {
        const idProducts= +e.target.parentElement.parentElement.id;

        if(cart[idProducts].amount<cart[idProducts].stock){
            cart[idProducts].amount++;
        }else{cart[idProducts].amount}
    }
    
    if (e.target.classList.contains("bx-trash-alt")) {
        const idProducts= +e.target.parentElement.parentElement.id;
        delete cart[idProducts];
    }
// width desktop 30vw- mobile 80vw
    printFoodInCart();

})

// ****************************CODIGO PARA HAMBURGUESA A MOVILE***********************
const Burger = document.querySelector("#btnHambu");
const Nav = document.querySelector("#nav");

Burger.addEventListener("click", function () {
    Nav.classList.toggle("showmenu2");
    
});
