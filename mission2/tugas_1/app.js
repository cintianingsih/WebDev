document.addEventListener("DOMContentLoaded", function() {
    const containers = document.querySelectorAll(".quantity-container");
    const tampilkanButtons = document.querySelectorAll(".tampilkan-button");
    const quantityElements = document.querySelectorAll(".quantity");
    const totalBelanjaElements = document.querySelectorAll(".total-belaja");
    const decrementButtons = document.querySelectorAll(".decrement-button");
    const incrementButtons = document.querySelectorAll(".increment-button");
    const nilaiTertampilElements = document.querySelectorAll(".nilai-tertampil");
    const totalKeseluruhanElement = document.querySelector(".total-keseluruhan"); 
    const subtotalElement = document.querySelector(".subtotal"); 
    const pajakElement = document.querySelector(".pajak"); 
  
    let jsonData; 
    let totalKeseluruhan = 0; 
  
    fetch("products.json")
      .then(response => response.json())
      .then(data => {
        jsonData = data;
      })
      .catch(error => {
        console.error("Error fetching JSON data:", error);
      });
      
    tampilkanButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        updateTotalBelanja(index);
        totalBelanjaElements[index].style.display = "block";
        calculateTotalKeseluruhan(); 
      });
    });
  
    decrementButtons.forEach((button, index) => {
      button.addEventListener("click", () => updateQuantity(index, -1));
    });
  
    incrementButtons.forEach((button, index) => {
      button.addEventListener("click", () => updateQuantity(index, 1));
    });
  
    function updateQuantity(index, change) {
      const currentQuantity = parseInt(quantityElements[index].textContent);
      const newQuantity = currentQuantity + change;
  
      if (newQuantity >= 0) {
        quantityElements[index].textContent = newQuantity;
      }
    }
  
    function updateTotalBelanja(index) {
      let totalBelanja = 0;
      const quantity = parseInt(quantityElements[index].textContent);
      const price = jsonData.products[index].price;
      totalBelanja = quantity * price;
  
      if (quantity > 0) {
        const product = jsonData.products[index];
        const productInfo = `
          <img src="${product.photo}" alt="${product.name}" style="width: 100px; height: 100px;">
          <h2>${product.name}</h2>
          <p>Price: Rp. ${product.price}</p>
        `;
  
        nilaiTertampilElements[index].innerHTML = productInfo;
        totalBelanjaElements[index].textContent = `Total Belanja: Rp. ${totalBelanja.toFixed(2)}`;
        totalBelanjaElements[index].style.display = "block"; 
      } else {
        totalBelanjaElements[index].style.display = "none"; 
      }
    }
  
    function calculateTotalKeseluruhan() {
      totalKeseluruhan = 0;
      totalBelanjaElements.forEach(element => {
        if (element.style.display !== "none") {
          const totalBelanja = parseFloat(element.textContent.replace("Total Belanja: Rp. ", " "));
          totalKeseluruhan += totalBelanja;
        }
      });
  
      const pajak = totalKeseluruhan * 0.11; 
      const subtotal = totalKeseluruhan;
      const totalKeseluruhanDenganPajak = totalKeseluruhan + pajak;
  
      subtotalElement.textContent = `Total Pembelian: Rp. ${subtotal.toFixed(2)}`;
      pajakElement.textContent = `Pajak 11%: Rp. ${pajak.toFixed(2)}`;
      totalKeseluruhanElement.textContent = `Total Bayar: Rp. ${totalKeseluruhanDenganPajak.toFixed(2)}`;
    }
  });
  