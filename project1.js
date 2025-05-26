
function toggleDetails(button) {
  const details = button.nextElementSibling;
  details.style.display = details.style.display === 'block' ? 'none' : 'block';
}
function addToWishlist(button) {
  const card = button.closest(".card");
  const title = card.querySelector("h3").textContent;
  const image = card.querySelector("img").getAttribute("src");
  const price = card.querySelector(".price").textContent;

  const item = { title, image, price };
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  wishlist.push(item);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  window.location.href = "wishlist.html";
}

function buyArt(button) {
  const card = button.closest(".card");
  const title = card.querySelector("h3").textContent;

  localStorage.setItem("buyItem", title);
  window.location.href = "buy.html";
}
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("ok");
  const searchBtn = document.getElementById("S");
  const clearBtn = document.getElementById("clearSearch");
  const categoryFilter = document.getElementById("categoryFilter");
  const priceFilter = document.getElementById("priceFilter");

  function filterCards() {
    const query = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;
    const priceRange = priceFilter.value;
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const details = card.querySelector(".details p").textContent.toLowerCase();
      const priceText = card.querySelector(".price").textContent.replace('$', '');
      const price = parseFloat(priceText);

      let categoryMatch = true;
      if (category === "abstract") {
        categoryMatch = title.includes("abstract");
      } else if (category === "nature") {
        categoryMatch = details.includes("nature") || title.includes("nature");
      } else if (category === "classic") {
        categoryMatch = title.includes("mona lisa");
      }

      let priceMatch = true;
      if (priceRange === "low") {
        priceMatch = price < 50;
      } else if (priceRange === "mid") {
        priceMatch = price >= 50 && price <= 100;
      } else if (priceRange === "high") {
        priceMatch = price > 100;
      }

      const searchMatch = title.includes(query) || details.includes(query);

      if (searchMatch && categoryMatch && priceMatch) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  searchInput.addEventListener("input", filterCards); 
  searchBtn.addEventListener("click", filterCards);
  categoryFilter.addEventListener("change", filterCards);
  priceFilter.addEventListener("change", filterCards);

  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "";
    priceFilter.value = "";
    filterCards();
  });
});
document.addEventListener("DOMContentLoaded", () => {

  const user = {
    name: "Akhil Sharma",
    mobile: "+91 9876543210",
    previousOrders: [
      "Fluorite - Oil Painting",
      "Abstract Nature Art",
      "The Night Rainy"
    ]
  };

  document.querySelector('a[href="#Account"]').addEventListener("click", (e) => {
    e.preventDefault();

    const accountSection = document.getElementById("Account");
    accountSection.style.display = "block";
    accountSection.scrollIntoView({ behavior: "smooth" });

    document.getElementById("accountName").textContent = user.name;
    document.getElementById("accountMobile").textContent = user.mobile;

    const orderList = document.getElementById("previousOrders");
    orderList.innerHTML = ""; 

    user.previousOrders.forEach(order => {
      const li = document.createElement("li");
      li.textContent = order;
      orderList.appendChild(li);
    });
  });
});

