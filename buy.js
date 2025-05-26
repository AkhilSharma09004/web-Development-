document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("buyItem"));
  const div = document.getElementById("buyItem");

  if (Array.isArray(data)) {
    // Multiple items
    let total = 0;
    data.forEach((item) => {
      const price = parseFloat(item.price.replace('$', '')) || 0;
      total += price;

      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p class="price">${item.price}</p>
        <p>Thank you for choosing to buy this artwork!</p>
      `;
      div.appendChild(card);
    });

    const totalDiv = document.createElement("h3");
    totalDiv.style.color = "green";
    totalDiv.textContent = `Total Paid: $${total.toFixed(2)}`;
    div.appendChild(totalDiv);

  } else if (data) {
    // Single item
    div.innerHTML = `
      <div class="card">
        <img src="${data.image}" alt="${data.title}">
        <h3>${data.title}</h3>
        <p class="price">${data.price}</p>
        <p>Thank you for choosing to buy this artwork!</p>
      </div>
    `;
  } else {
    div.textContent = "No item selected to buy.";
  }
});
