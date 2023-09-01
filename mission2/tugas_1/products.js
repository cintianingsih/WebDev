document.addEventListener("DOMContentLoaded", function () {
    const itemsContainer = document.getElementById("items");
    const cart = document.getElementById("cart");
    const total = document.getElementById("total");
    const tax = document.getElementById("tax");
    const subTotal = document.getElementById("subTotal");

    let cartItems = [];
    let cartTotal = 0;

    // Function to add items to the cart
    function addToCart(name, price, quantity) {
        const existingItem = cartItems.find((item) => item.name === name);

        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.totalPrice += price * quantity;
        } else {
            cartItems.push({ name, price, quantity, totalPrice: price * quantity });
        }

        cartTotal += price * quantity;

        // Calculate tax (11% of the cart total)
        const cartTax = 0.11 * cartTotal;

        // Calculate sub-total (cart total + tax)
        const cartSubTotal = cartTotal + cartTax;

        // Update the HTML
        updateCart(cartTax, cartSubTotal);
    }

    // Function to update the cart's HTML
    function updateCart(cartTax, cartSubTotal) {
        cart.innerHTML = cartItems
            .map((cartItem) => {
                return `
                    <li>
                        <span>${cartItem.name} x ${cartItem.quantity} Rp. ${cartItem.price.toFixed(3)}</span>
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
                    <h3>${itemData.name}</h3>
                    <p>Price: Rp.${itemData.price.toFixed(3)}</p>
                    <img src="${itemData.image}" alt="${itemData.name}" style="width: 100px; height: 100px;">
                    <button class="decrement-quantity" data-name="${itemData.name}" data-price="${itemData.price}">-</button>
                    <input type="number" id="quantity-${itemData.name}" value="0" min="0" style="width: 20px; height: 17px;">
                    <button class="increment-quantity" data-name="${itemData.name}" data-price="${itemData.price}">+</button>
                    <button class="add-to-cart" data-name="${itemData.name}" data-price="${itemData.price}">Add to Cart</button>
                `;
                itemsContainer.appendChild(itemElement);

                // Add event listeners for the "Increment," and "Decrement" buttons
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

                // Add event listener to the "Add to Cart" button
                const addToCartButton = itemElement.querySelector(".add-to-cart");
                addToCartButton.addEventListener("click", () => {
                    const quantityInput = document.getElementById(`quantity-${name}`);
                    const quantity = parseInt(quantityInput.value);
                    if (quantity > 0) {
                        addToCart(name, price, quantity);
                        quantityInput.value = "0"; // Reset quantity input to 0
                    }
                });
            });
        })
        .catch((error) => console.error("Error loading items:", error));
});
