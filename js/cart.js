// Ambil tombol tambah keranjang
const buttons = document.querySelectorAll('.btn-add-cart');

// Ambil data keranjang dari localStorage atau inisialisasi baru
let cart = JSON.parse(localStorage.getItem('cart')) || {};

// Simpan cart ke localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Tambah item ke keranjang
function addToCart(id) {
  if (cart[id]) {
    cart[id]++;
  } else {
    cart[id] = 1;
  }
  saveCart();
  alert('Berhasil ditambahkan ke keranjang!');
}

// Event klik ke tombol
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-id');
    addToCart(id);
  });
});
