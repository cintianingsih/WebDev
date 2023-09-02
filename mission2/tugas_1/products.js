document.addEventListener("DOMContentLoaded", function () {
    const itemsContainer = document.getElementById("items");
    const cart = document.getElementById("cart");
    const total = document.getElementById("total");
    const tax = document.getElementById("tax");
    const subTotal = document.getElementById("subTotal");

    let cartItems = [];
    let cartTotal = 0;

    // Function to add items to the cart
    function addToCart(name, price, quantity, imageUrl) {
        const existingItem = cartItems.find((item) => item.name === name);

        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.totalPrice += price * quantity;
        } else {
            cartItems.push({ name, price, quantity, totalPrice: price * quantity, imageUrl });
        }

        cartTotal += price * quantity;

        const cartTax = 0.11 * cartTotal;

        const cartSubTotal = cartTotal + cartTax;

        updateCart(cartTax, cartSubTotal);
        updateCartProductImage(imageUrl);
    }

    function updateCartProductImage(imageUrl) {
        const productImage = document.getElementById("cart-product-image");
        productImage.src = imageUrl;
    }

    // Function to update the cart's HTML
    function updateCart(cartTax, cartSubTotal) {
        cart.innerHTML = cartItems
            .map((cartItem) => {
                const itemTotalPrice = cartItem.price * cartItem.quantity;
                return `
                    <li>
                        <div class="row">
                            <div class="col-1">
                                <img src="${cartItem.imageUrl}" alt="${cartItem.name}">
                            </div>
                            <div class="col-11">
                            <div class="row row-cols-1">
                                <div class="col" style="padding-left: 30px; padding-top: 25px;color: #874356"><span>${cartItem.name}</span></div>
                                <div class="row row-cols-2">
                                    <div class="col" style="padding-left: 30px"><span>Rp. ${cartItem.price.toFixed(3)} x ${cartItem.quantity}</span></div>
                                    <div class="col" style="padding-left: 200px"><span>Rp. ${itemTotalPrice.toFixed(3)} </span></div>
                                </div>
                            </div>
                        </div>
                    </li>
                `;
            })
            .join("");

        total.textContent = cartTotal.toFixed(3);
        tax.textContent = cartTax.toFixed(3);
        subTotal.textContent = cartSubTotal.toFixed(3);
    }

    // Load items from JSON file
    fetch("products.json")
        .then((response) => response.json())
        .then((itemsData) => {
            // Create and add items using data from JSON
            itemsData.forEach((itemData) => {
                const itemElement = document.createElement("div");
                itemElement.classList.add("item");
                itemElement.innerHTML = `
                    <img src="${itemData.image}" alt="${itemData.name}" style="width: 150px; height: 150px; border-radius: 10px">
                    <h3>${itemData.name}</h3>
                    <p>Rp. ${itemData.price.toFixed(3)}</p>
                    <button class="decrement-quantity" data-name="${itemData.name}"data-price="${itemData.price}">-</button>
                    <input class="kuantitas" type="number" id="quantity-${itemData.name}" value="0" min="0">
                    <button class="increment-quantity" data-name="${itemData.name}" data-price="${itemData.price}">+</button><br>
                    <button class="add-to-cart" data-name="${itemData.name}" data-price="${itemData.price}">Tambah Barang</button>
                `;
                itemsContainer.appendChild(itemElement);

                const name = itemData.name;
                const price = itemData.price;

                const decrementButton = itemElement.querySelector(".decrement-quantity");
                decrementButton.addEventListener("click", () => {
                    const quantityInput = document.getElementById(`quantity-${name}`);
                    let quantity = parseInt(quantityInput.value);
                    if (quantity > 0) {
                        quantityInput.value = String(quantity - 1);
                    }
                });

                const incrementButton = itemElement.querySelector(".increment-quantity");
                incrementButton.addEventListener("click", () => {
                    const quantityInput = document.getElementById(`quantity-${name}`);
                    let quantity = parseInt(quantityInput.value);
                    quantityInput.value = String(quantity + 1);
                });

                const addToCartButton = itemElement.querySelector(".add-to-cart");
                addToCartButton.addEventListener("click", () => {
                    const quantityInput = document.getElementById(`quantity-${name}`);
                    const quantity = parseInt(quantityInput.value);
                    if (quantity > 0) {
                        quantityInput.value = "0";
                        addToCart(name, price, quantity, itemData.image);
                    }
                });
            });
        })
        .catch((error) => console.error("Error loading items:", error));

    function displayFakeReceipt() {
        // Cek apakah ada produk di keranjang
        if (cartItems.length === 0) {
            alert("Keranjang belanja kosong. Tambahkan produk terlebih dahulu.");
            return;
        }

        // Membuat teks struk
        const fakeReceiptContent = `
            Struk Pembelian                                   cin's beauty
            ------------------------------------------------------------------
            ${cartItems.map((cartItem) => {
                const itemTotalPrice = cartItem.price * cartItem.quantity;
                return `
                    ${cartItem.name}
                    Rp. ${cartItem.price.toFixed(3)}    x ${cartItem.quantity}          = Rp. ${itemTotalPrice.toFixed(3)}
                `;
            }).join("")}
            ------------------------------------------------------------------
            Total Pembelian : Rp. ${cartTotal.toFixed(3)}
            Pajak (11%): Rp. ${tax.textContent}
            Total Bayar : Rp. ${subTotal.textContent}
        `;

        // Menampilkan struk di notifikasi
        alert(fakeReceiptContent);
    }

    const printReceiptButton = document.getElementById("printReceiptButton");
    printReceiptButton.addEventListener("click", () => {
        displayFakeReceipt();
    });
});