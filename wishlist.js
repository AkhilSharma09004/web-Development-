document.addEventListener("DOMContentLoaded", () => {
  const items = JSON.parse(localStorage.getItem("wishlist")) || [];
  const container = document.getElementById("wishlistItems");
  const totalElement = document.getElementById("totalAmount");

  let total = 0;

  items.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card";

    const numericPrice = parseFloat(item.price.replace('$', '')) || 0;
    total += numericPrice;

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h3>${item.title}</h3>
      <p class="price">${item.price}</p>
      <button onclick="buyFromWishlist(${index})">Buy Now</button>
      <button onclick="removeFromWishlist(${index})">Remove</button>
    `;

    container.appendChild(card);
  });

  totalElement.textContent = `Total: $${total.toFixed(2)}`;
});

function removeFromWishlist(index) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  location.reload();
}

function buyFromWishlist(index) {
  const items = JSON.parse(localStorage.getItem("wishlist")) || [];
  const item = items[index];
  localStorage.setItem("buyItem", JSON.stringify(item));
  window.location.href = "buy.html";
}

// ✅ New function for buying all items
function buyAll() {
  const items = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (items.length === 0) {
    alert("Your wishlist is empty!");
    return;
  }
  localStorage.setItem("buyItem", JSON.stringify(items));
  window.location.href = "buy.html";
}
