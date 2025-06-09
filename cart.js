function loadCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartDiv = document.getElementById('cart-items');
  cartDiv.innerHTML = '';
  if (cart.length === 0) {
    cartDiv.innerHTML = '<p class="text-gray-700">Keranjang kosong.</p>';
    return;
  }
  cart.forEach(productId => {
    const product = products.find(p => p.id === productId);
    cartDiv.innerHTML += `
      <div class="bg-white p-4 rounded shadow flex justify-between items-center">
        <span>${product.name}</span>
        <span>Rp ${product.price}</span>
      </div>
    `;
  });
}
function checkout() {
  window.location.href = 'checkout.html';
}
loadCart();
