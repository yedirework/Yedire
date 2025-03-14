const products = [
  { id: 1, name: "laptop computer", price: 20000, description: "High Capacity computer.", image: "laptop.jpg", category: "Computer" },
  { id: 2, name: "Samsung tablet", price: 8000, description: "Hihg Performance and Quality.", image: "tablet.JPG", category: "Tablet" },
  { id: 3, name: "Samsung Mobile", price: 6000, description: "Goog Capacty with best battry.", image: "Mobile.jpg", category: "Telephon" },
  { id: 4, name: "Dell Desktop Computer", price: 15000, description: "Cori7 and 1TB SSD.", image: "desktop.jpg", category: "Computer" },
  { id: 5, name: "TP Link", price: 2000, description: "Archer A6 Router.", image: "tplink.jpg", category: "Router" },
  { id: 6, name: "Data Server", price: 50000, description: "Very High Capacity and Performance.", image: "server.jpg", category: "Computer" }
 // { id: 7, name: "Data Server", price: 50000, description: "Very High Capacity and Performance.", image: "server.jpg", category: "Computer" }

  
];

let cart = [];

function renderProducts(filteredProducts = products) {
  const productList = document.querySelector('.product-list');
  productList.innerHTML = ''; 

  filteredProducts.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product-item');
    productDiv.setAttribute('role', 'button');
    productDiv.setAttribute('tabindex', '0');
    productDiv.setAttribute('aria-label', `View details for ${product.name}`);
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}" onclick="viewProductDetails(${product.id})">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="price">$${product.price}</div>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
    productList.appendChild(productDiv);
  });
}

function searchProducts() {
  const searchTerm = document.getElementById('search-bar').value.toLowerCase();
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) || 
    product.category.toLowerCase().includes(searchTerm)
  );
  renderProducts(filteredProducts); 
}

function viewProductDetails(id) {
  const product = products.find(p => p.id === id);
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-image').src = product.image;
  document.getElementById('product-price').textContent = product.price;
  document.getElementById('product-description').textContent = product.description;
  document.getElementById('product-detail-modal').style.display = 'flex';
}

function closeProductDetail() {
  document.getElementById('product-detail-modal').style.display = 'none';
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);

  const existingProduct = cart.find(item => item.id === product.id);

  if (!existingProduct) {
    cart.push(product); 
  }
  
  updateCart(); 
}

function updateCart() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = cart.length; 
  
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = ''; 
  let totalPrice = 0;
  
  cart.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartItems.appendChild(listItem);
    totalPrice += item.price; 
  });
  
  document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`; 
}

function clearCart() {
  cart = []; 
  updateCart(); 
}

function toggleCart() {
  const cartModal = document.getElementById('cart-modal');
  cartModal.style.display = cartModal.style.display === 'flex' ? 'none' : 'flex';
}

function openCheckoutModal() {
  const checkoutModal = document.getElementById('checkout-modal');
  checkoutModal.style.display = 'flex';
}

function closeCheckoutModal() {
  const checkoutModal = document.getElementById('checkout-modal');
  checkoutModal.style.display = 'none';
}

function validateCheckoutForm() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;

  if (!name || !email || !address) {
    alert("Please fill out all fields.");
    return false; 
  }

  alert("Order placed successfully!");
  closeCheckoutModal();
  cart = []; 
  updateCart();
  return false; 
}
window.onload = () => {
  renderProducts(); 
};
