/* SHOP */

let elementsArray = document.getElementsByClassName("item");

let cartContainer = document.getElementById("cartSide");
let shopItems = document.getElementById("shopItems");

let itemInCart = 0;

Array.prototype.forEach.call(elementsArray,function(elem) {
    elem.addEventListener("click", function() {




    });
});

/* SHOP */


/* INVENTORY/CHAT SWITCH */
document.onload = () =>{
    let chatButton = document.getElementById("chatBut");
    let inventoryButton = document.getElementById("invBut");
    let chatContent = document.getElementById("chatContent")
    let invContent = document.getElementById("invContent")


    chatButton.addEventListener("click", function() {
        if (window.getComputedStyle(chatContent, null).display === "none"){
            chatContent.style.display = "flex";
            invContent.style.display = "none";
        }
    })

    inventoryButton.addEventListener("click", function() {
        if (window.getComputedStyle(invContent, null).display === "none"){
            invContent.style.display = "flex";
            chatContent.style.display = "none";
        }
    })
}

/* INVENTORY/CHAT SWITCH */
