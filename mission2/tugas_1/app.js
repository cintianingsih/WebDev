// const availableItems = document.querySelectorAll('.products')
// const btnProd = document.querySelectorAll('.btn-prod')

// console.log(availableItems)


// const cartItem=[]

// btnProd.forEach((prod) => {
//     btn.addEventListener('click',()=>{
//         console.log(btn.parentNode)
//     })
    
// });

document.addEventListener('DOMContentLoaded', function () {
    const jmlbrg = document.getElementById('kuantitas');
    const add = document.getElementById('add');
    const min = document.getElementById('min');

    const tampilkanBtn = document.getElementById("tampilkan-btn");
    const nilaiTertampil = document.getElementById("nilai-tertampil");

    let jumlahBarang = 0;

    function updateJumlahBarang() {
        jmlbrg.textContent = jumlahBarang;
    }

    add.addEventListener('click', function () {
        jumlahBarang++;
        updateJumlahBarang();
    });

    min.addEventListener('click', function () {
        if (jumlahBarang > 0) {
            jumlahBarang--;
            updateJumlahBarang();
        }
    });         
    updateJumlahBarang();

    tampilkanBtn.addEventListener("click", function() {
        const nilai = jumlahBarang
        console.log("Nilai yang dimasukkan:", nilai);
        if (jumlahBarang > 0){
            nilaiTertampil.textContent = "x " + nilai;
        }
    });

    fetch('products.json')
    .then(response => response.json())
    .then(products => {
      const productList = document.querySelector('.product-list');

      // Loop melalui setiap produk dalam data JSON
      products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <h2>${product.nama}</h2>
          <img src="${product.gambar}" alt="${product.nama}">
          <p><strong>Harga:</strong> ${product.harga}</p>
          <p><strong>Deskripsi:</strong> ${product.deskripsi}</p>
        `;
        productList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Terjadi kesalahan:', error);
    });

    const incrementButtons = document.querySelectorAll('.increment-button');
    const decrementButtons = document.querySelectorAll('.decrement-button');

    const totalQuantityElement = document.querySelector('.total-quantity');

    let totalQuantity = 0;


    incrementButtons.forEach(button => {
        button.addEventListener('click', () => {
        const quantityElement = button.nextElementSibling;
        let quantity = parseInt(quantityElement.textContent);
        quantityElement.textContent = ++quantity;
        totalQuantity++;
        totalQuantityElement.textContent = totalQuantity;
        });
    });

    decrementButtons.forEach(button => {
        button.addEventListener('click', () => {
        const quantityElement = button.previousElementSibling;
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 0) {
            quantityElement.textContent = --quantity;
            totalQuantity--;
            totalQuantityElement.textContent = totalQuantity;
            }
        });
    });

});




