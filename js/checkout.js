// Inisialisasi
document.addEventListener('DOMContentLoaded', function() {
  loadCartItems();
  setupEventListeners();
  updateOrderSummary();
});

// Fungsi Utama
function loadCartItems() {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  const orderItemsContainer = document.querySelector('.order-items');
  
  if (Object.keys(cart).length === 0) {
    orderItemsContainer.innerHTML = '<p class="empty-message">Keranjang belanja kosong</p>';
    return;
  }

  let itemsHTML = '';
  Object.keys(cart).forEach(productId => {
    const product = products.find(p => p.id == productId);
    if (!product) return;

    itemsHTML += `
      <div class="order-item">
        <img src="${product.image}" alt="${product.title}">
        <div class="order-item-details">
          <div class="order-item-title">${product.title}</div>
          <div class="order-item-price">Rp ${product.price.toLocaleString('id-ID')} × ${cart[productId]}</div>
          <div class="order-item-total">Rp ${(product.price * cart[productId]).toLocaleString('id-ID')}</div>
        </div>
      </div>
    `;
  });

  orderItemsContainer.innerHTML = itemsHTML;
}

function updateOrderSummary() {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  const subtotal = calculateSubtotal();
  const shipping = calculateShipping();
  const total = subtotal + shipping;

  document.getElementById('summary-subtotal').textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
  document.getElementById('summary-shipping').textContent = `Rp ${shipping.toLocaleString('id-ID')}`;
  document.getElementById('summary-total').textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

function calculateSubtotal() {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  return Object.keys(cart).reduce((total, productId) => {
    const product = products.find(p => p.id == productId);
    return total + (product ? product.price * cart[productId] : 0);
  }, 0);
}

function calculateShipping() {
  // Logika perhitungan ongkir bisa disesuaikan
  return 15000; // Contoh flat rate
}

function setupEventListeners() {
  // Payment method selection
  document.querySelectorAll('.payment-option').forEach(option => {
    option.addEventListener('click', function() {
      document.querySelectorAll('.payment-option').forEach(opt => {
        opt.classList.remove('active');
      });
      this.classList.add('active');
    });
  });

  // Place order button
  document.getElementById('place-order-btn').addEventListener('click', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulasi proses order
      showNotification('Pesanan berhasil dibuat!');
      
      // Kosongkan keranjang
      localStorage.removeItem('cart');
      
      // Redirect ke halaman terima kasih
      setTimeout(() => {
        window.location.href = 'thankyou.html';
      }, 1500);
    }
  });
}

function validateForm() {
  const form = document.getElementById('delivery-form');
  const requiredFields = form.querySelectorAll('[required]');
  
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#e74c3c';
      isValid = false;
      
      // Reset error setelah 2 detik
      setTimeout(() => {
        field.style.borderColor = '#ddd';
      }, 2000);
    }
  });
  
  return isValid;
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}