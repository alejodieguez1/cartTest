document.addEventListener("rebuy:cart.change", (event) => {
  Array.from(window.Rebuy.Cart.items()).forEach((item) => {
    if (item.quantity > 3) {
      document
        .querySelector(".limit__error-modal")
        .classList.replace("hide", "show");
      window.Rebuy.Cart.decreaseItem(item);
    }
  });
  const closeBtn = document.querySelector(".close-container");
  closeBtn.addEventListener("click", () => {
    document
      .querySelector(".limit__error-modal")
      .classList.replace("show", "hide");
  });
  const cartBtns = document.querySelectorAll(".rebuy-button");
  setTimeout(() => {
    cartBtns.forEach((btn) => {
      if (window.Rebuy.Cart.items().length > 0) {
        btn.classList.add("btn-inactive");
      } else if (window.Rebuy.Cart.items().length == 0) {
        btn.classList.remove("btn-inactive");
      }
    });
  }, 500);
});
