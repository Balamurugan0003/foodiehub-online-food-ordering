// FOODIEHUB - front-end demonstration application.
const foodItems = [
 {id:1,name:"Masala Dosa",category:"South Indian",price:90,desc:"Crispy dosa with potato masala and chutneys.",rating:"4.9",emoji:"🥞",image:"https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=700&q=80"},
 {id:2,name:"Idli Sambar",category:"South Indian",price:60,desc:"Soft steamed idlis with warm sambar.",rating:"4.8",emoji:"🍚",image:"https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80"},
 {id:3,name:"Pongal",category:"South Indian",price:75,desc:"Comforting pepper and cumin rice-lentil pongal.",rating:"4.7",emoji:"🍲",image:"https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=700&q=80"},
 {id:4,name:"Paneer Butter Masala",category:"North Indian",price:190,desc:"Paneer cubes in a rich tomato-butter gravy.",rating:"4.9",emoji:"🍛",image:"https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80"},
 {id:5,name:"Veg Biryani",category:"North Indian",price:160,desc:"Fragrant basmati rice with garden vegetables.",rating:"4.8",emoji:"🍚",image:"https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=700&q=80"},
 {id:6,name:"Butter Naan",category:"North Indian",price:45,desc:"Soft tandoor-baked bread brushed with butter.",rating:"4.6",emoji:"🫓",image:"https://images.unsplash.com/photo-1600628422019-8e7f4c5b5b6f?auto=format&fit=crop&w=700&q=80"},
 {id:7,name:"Classic Veg Burger",category:"Fast Food",price:120,desc:"Crisp veggie patty, lettuce and house sauce.",rating:"4.7",emoji:"🍔",image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80"},
 {id:8,name:"Margherita Pizza",category:"Fast Food",price:220,desc:"Mozzarella, tomato and fresh basil.",rating:"4.9",emoji:"🍕",image:"https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=80"},
 {id:9,name:"French Fries",category:"Fast Food",price:90,desc:"Golden, crunchy fries with a seasoning dust.",rating:"4.6",emoji:"🍟",image:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80"},
 {id:10,name:"Cold Coffee",category:"Beverages",price:110,desc:"Chilled creamy coffee topped with foam.",rating:"4.8",emoji:"🥤",image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80"},
 {id:11,name:"Fresh Lime Soda",category:"Beverages",price:55,desc:"Refreshing lime, soda and a hint of mint.",rating:"4.5",emoji:"🍋",image:"https://images.unsplash.com/photo-1513558161293-cdee1ed395d7?auto=format&fit=crop&w=700&q=80"},
 {id:12,name:"Mango Smoothie",category:"Beverages",price:130,desc:"A thick, sunny mango and yoghurt blend.",rating:"4.8",emoji:"🥭",image:"https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=700&q=80"},
 {id:13,name:"Chocolate Brownie",category:"Desserts",price:100,desc:"Fudgy chocolate brownie with a soft centre.",rating:"4.9",emoji:"🍫",image:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80"},
 {id:14,name:"Gulab Jamun",category:"Desserts",price:70,desc:"Warm milk-solid dumplings in sugar syrup.",rating:"4.8",emoji:"🍮",image:"https://images.unsplash.com/photo-1666190092159-5c5b0e1c6b2d?auto=format&fit=crop&w=700&q=80"},
 {id:15,name:"Strawberry Cheesecake",category:"Desserts",price:150,desc:"Creamy cheesecake with strawberry topping.",rating:"4.9",emoji:"🍰",image:"https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80"}
];

let cart = loadCart();
let activeCategory = "All";
let toastTimer;

function loadCart(){
  try { return JSON.parse(localStorage.getItem("foodiehubCart")) || []; }
  catch(error){ return []; }
}
function saveCart(){ localStorage.setItem("foodiehubCart", JSON.stringify(cart)); }
function money(amount){ return "₹" + amount.toLocaleString("en-IN"); }

function renderFood(){
  const search = document.getElementById("searchInput").value.trim().toLowerCase();
  const filtered = foodItems.filter(item => {
    const categoryMatch = activeCategory === "All" || item.category === activeCategory;
    const searchMatch = (item.name + " " + item.category + " " + item.desc).toLowerCase().includes(search);
    return categoryMatch && searchMatch;
  });
  document.getElementById("foodGrid").innerHTML = filtered.map(item => `
    <article class="food-card">
      <div class="food-photo"><img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.style.display='none'"><span class="food-emoji">${item.emoji}</span><span class="food-tag">${item.category}</span></div>
      <div class="food-info"><div class="food-meta"><h3>${item.name}</h3><span class="food-rating">★ ${item.rating}</span></div>
      <p class="food-desc">${item.desc}</p><div class="food-bottom"><span class="food-price">${money(item.price)}</span><button class="add-btn" data-add="${item.id}" aria-label="Add ${item.name} to cart">+</button></div></div>
    </article>`).join("");
  document.getElementById("resultCount").textContent = `${filtered.length} ${filtered.length === 1 ? "delicious pick" : "delicious picks"}`;
  document.getElementById("emptyState").classList.toggle("hidden", filtered.length !== 0);
  document.getElementById("foodGrid").classList.toggle("hidden", filtered.length === 0);
}
function addToCart(id){
  const found = cart.find(row => row.id === id);
  if(found) found.quantity += 1;
  else cart.push({id, quantity:1});
  saveCart(); renderCart(); showToast("Added to your cart!");
}
function changeQuantity(id, amount){
  const row = cart.find(item => item.id === id);
  if(!row) return;
  row.quantity += amount;
  if(row.quantity <= 0) cart = cart.filter(item => item.id !== id);
  saveCart(); renderCart();
}
function cartDetails(){
  const rows = cart.map(row => ({...foodItems.find(item => item.id === row.id), quantity:row.quantity})).filter(row => row.id);
  const subtotal = rows.reduce((sum,row) => sum + row.price * row.quantity, 0);
  const delivery = subtotal === 0 || subtotal >= 499 ? 0 : 30;
  return {rows, subtotal, delivery, total:subtotal + delivery};
}
function renderCart(){
  const {rows,subtotal,delivery,total} = cartDetails();
  const count = rows.reduce((sum,row) => sum + row.quantity,0);
  document.getElementById("cartCount").textContent = count;
  document.getElementById("drawerCount").textContent = `(${count})`;
  document.getElementById("cartItems").innerHTML = rows.length ? rows.map(row => `
    <div class="cart-row"><img class="cart-thumb" src="${row.image}" alt="${row.name}" onerror="this.style.display='none'">
    <div><h4>${row.name}</h4><small>${money(row.price)} each</small><div class="quantity"><button data-change="${row.id}" data-amount="-1" aria-label="Decrease ${row.name}">−</button><span>${row.quantity}</span><button data-change="${row.id}" data-amount="1" aria-label="Increase ${row.name}">+</button></div></div>
    <strong class="cart-row-price">${money(row.price*row.quantity)}</strong></div>`).join("") : `<div class="cart-empty"><span>🛍️</span><h3>Your cart is waiting</h3><p>Add a few delicious things to get started.</p></div>`;
  document.getElementById("subtotal").textContent = money(subtotal);
  document.getElementById("deliveryFee").textContent = money(delivery);
  document.getElementById("grandTotal").textContent = money(total);
  document.getElementById("checkoutTotal").textContent = money(total);
  document.getElementById("checkoutBtn").disabled = count === 0;
}
function setCategory(category){
  activeCategory = category;
  document.querySelectorAll(".category-chip").forEach(button => button.classList.toggle("selected", button.dataset.category === category));
  renderFood();
}
function showCart(){
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("drawerBackdrop").classList.add("show");
  document.getElementById("cartDrawer").setAttribute("aria-hidden","false");
}
function hideCart(){
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("drawerBackdrop").classList.remove("show");
  document.getElementById("cartDrawer").setAttribute("aria-hidden","true");
}
function showCheckout(){
  if(!cart.length) return;
  hideCart(); document.getElementById("checkoutBackdrop").classList.add("show");
}
function hideCheckout(){ document.getElementById("checkoutBackdrop").classList.remove("show"); }
function showToast(message){
  const toast = document.getElementById("toast");
  toast.textContent = message; toast.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("show"),2200);
}
function clearCart(){
  if(!cart.length){showToast("Your cart is already empty.");return;}
  cart=[];saveCart();renderCart();showToast("Your cart has been cleared.");
}
function placeOrder(event){
  event.preventDefault();
  const form = event.currentTarget;
  if(!form.reportValidity()) return;
  const {rows,total} = cartDetails();
  if(!rows.length) return;
  const orderId = "FH-" + Date.now().toString().slice(-7);
  const customer = {
    name:document.getElementById("customerName").value.trim(),
    phone:document.getElementById("customerPhone").value.trim(),
    address:document.getElementById("customerAddress").value.trim(),
    payment:document.querySelector('input[name="payment"]:checked').value
  };
  document.getElementById("orderId").textContent = orderId;
  document.getElementById("successCustomer").innerHTML = `<strong>${customer.name}</strong><br>${customer.phone}<br>${customer.address}<br><span>Payment choice: ${customer.payment}</span>`;
  document.getElementById("successItems").innerHTML = rows.map(row => `<div class="success-item"><span>${row.name} × ${row.quantity}</span><strong>${money(row.price*row.quantity)}</strong></div>`).join("");
  document.getElementById("successTotal").textContent = money(total);
  hideCheckout(); document.getElementById("successBackdrop").classList.add("show");
  cart=[];saveCart();renderCart();form.reset();
}
function closeSuccess(){
  document.getElementById("successBackdrop").classList.remove("show");
  document.getElementById("searchInput").value="";
  setCategory("All");window.location.hash="#home";
}

document.getElementById("foodGrid").addEventListener("click",event => {
  const button = event.target.closest("[data-add]");
  if(button) addToCart(Number(button.dataset.add));
});
document.getElementById("cartItems").addEventListener("click",event => {
  const button = event.target.closest("[data-change]");
  if(button) changeQuantity(Number(button.dataset.change),Number(button.dataset.amount));
});
document.getElementById("categoryChips").addEventListener("click",event => {
  const button = event.target.closest("[data-category]");
  if(button) setCategory(button.dataset.category);
});
document.getElementById("searchInput").addEventListener("input",renderFood);
document.getElementById("clearFilters").addEventListener("click",() => {
  document.getElementById("searchInput").value="";setCategory("All");
});
document.getElementById("resetSearch").addEventListener("click",() => {
  document.getElementById("searchInput").value="";setCategory("All");
});
document.getElementById("cartToggle").addEventListener("click",showCart);
document.getElementById("closeCart").addEventListener("click",hideCart);
document.getElementById("drawerBackdrop").addEventListener("click",hideCart);
document.getElementById("resetCart").addEventListener("click",clearCart);
document.getElementById("checkoutBtn").addEventListener("click",showCheckout);
document.getElementById("closeCheckout").addEventListener("click",hideCheckout);
document.getElementById("checkoutBackdrop").addEventListener("click",event => {if(event.target.id==="checkoutBackdrop")hideCheckout();});
document.getElementById("checkoutForm").addEventListener("submit",placeOrder);
document.getElementById("closeSuccess").addEventListener("click",closeSuccess);
document.getElementById("doneBtn").addEventListener("click",closeSuccess);
document.addEventListener("keydown",event => {
  if(event.key==="Escape"){hideCart();hideCheckout();document.getElementById("successBackdrop").classList.remove("show");}
});
renderFood();renderCart();
