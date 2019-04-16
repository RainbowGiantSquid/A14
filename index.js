"use strict";

document.addEventListener("DOMContentLoaded", function(e) {
  // Get the modal
  const modal = document.getElementById("id01");

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});

$(".topnav li a, .topnav li button").click(function() {
  if ($("#dropdownClick").hasClass("responsive")) {
    $("#dropdownClick").removeClass("responsive");
  } else {
    $("#dropdownClick").addClass("responsive");
  }
});

function dropdownMenu() {
  var x = document.getElementById("dropdownClick");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
// gives atributes to all with data-login-btn
const loginBtn = document.querySelectorAll("[data-login-btn]");

loginBtn.forEach(function(element) {
  element.addEventListener("click", function(event) {
    document.getElementById("id01").style.display = "block";
  });
});

// loginBtn.onclick = function (event) {

//COURSES.HTML category filter
// courses - checkbox uncheck function

$(function() {
  var el = $('input:checkbox[name="subject"]');
  el.on("change", function(e) {
    if ($(this).attr("id") != "all") {
      if ($(this).is(":checked")) $("#all").prop("checked", false);
    } else {
      if ($(this).is(":checked")) el.not($(this)).prop("checked", false);
    }
    handleCheckbox(e);
  });
});

function handleCheckbox(evt) {
  var filter = $(":input:checked,select")
    .map(function(index, el) {
      return "." + el.value;
    })
    .toArray()
    .join(",")
    .replace(/,\.all$/, "");

  $(".category")
    .hide()
    .filter(filter)
    .show();
}
// $(":input").change(function(evt) {
//   var filter = $(":input:checked,select")
//     .map(function(index, el) {
//       return "." + el.value;
//     })
//     .toArray()
//     .join(",");
//   console.log(filter);

//   $(".category")
//     .hide()
//     .filter(filter)
//     .show();
// });
// BOOK ONLINE cart checkout

let cart = [];
const cartDOM = document.querySelector(".cart");
const addToCartButtonsDOM = document.querySelectorAll(
  '[data-action="ADD_TO_CART"]'
);

addToCartButtonsDOM.forEach(addToCartButtonDOM => {
  addToCartButtonDOM.addEventListener("click", () => {
    const productDOM = addToCartButtonDOM.parentNode;
    const product = {
      image: productDOM.querySelector(".product__image").getAttribute("src"),
      name: productDOM.querySelector(".product__name").innerText,
      subname: productDOM.querySelector(".product__sub").innerText,
      price: productDOM.querySelector(".product__price").innerText,
      quantity: 1
    };

    const isInCart =
      cart.filter(cartItem => cartItem.subname === product.subname).length > 0;

    if (!isInCart) {
      cartDOM.insertAdjacentHTML(
        "beforeend",
        `
      <div class="cart__item">
      <img class="cart_item_image" src="${product.image}" alt="${product.name}">
      <h3 class="cart_item_name">${product.name}</h3>
      <h3 class="cart_item_subname">${product.subname}</h3>
      <h3 class="cart_item_price">${product.price}</h3>
      <button class="btn btn--danger btn--small" data-action="DELETE_ITEM">&times;</button>
      </div>
      `
      );
      countCartTotal();

      if (document.querySelector(".cart-footer") === null) {
        cartDOM.insertAdjacentHTML(
          "afterend",
          `
        <div class="cart-footer">
        <button class="btn btn--yellow" data-action="CHECKOUT">Pay now</button>
        </div>
        `
        );
      }

      cart.push(product);
      addToCartButtonDOM.innerText = "In Cart";
      addToCartButtonDOM.disabled = true;

      const cartItemsDOM = cartDOM.querySelectorAll(".cart__item");
      cartItemsDOM.forEach(cartItemDOM => {
        if (
          cartItemDOM.querySelector(".cart_item_subname").innerText ===
          product.subname
        ) {
          cartItemDOM
            .querySelector('[data-action="DELETE_ITEM"]')
            .addEventListener("click", () => {
              cart.forEach(cartItem => {
                if (cartItem.subname === product.subname) {
                  cartItemDOM.classList.add("cart__item--removed");
                  setTimeout(() => cartItemDOM.remove(), 250);
                  cart = cart.filter(
                    cartItem => cartItem.subname !== product.subname
                  );
                  addToCartButtonDOM.innerText = "Add To Cart";
                  addToCartButtonDOM.disabled = false;
                }
              });
            });
        }
      });
    }
  });
});

function countCartTotal() {
  let cartTotal = 0;
  cart.forEach(cartItem => {
    cartTotal += cartItem.price * cartItem.quantity;
  });
}
