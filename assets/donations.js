setTimeout(() => {
  // const buttons = document.querySelectorAll(".donations__button");
  // const totalPriceElement = window.Rebuy.Cart.subtotal();
  // console.log(totalPriceElement + 100);
  // const prices = [1, 2, 5, 10];

  // buttons.forEach((button) => {
  //   button.price = prices[Math.floor(Math.random() * prices.length)];
  // });

  // buttons.forEach((button) => {
  //   button.addEventListener("click", () => {
  //     updatePrice(button.price);
  //   });
  // });

  // function updatePrice(price) {
  //   // const totalPrice = Number(
  //   //   totalPriceElement.textContent.replace(/[^0-9.-]+/g, "")
  //   // );
  //   const newTotalPrice = (totalPriceElement + price).toFixed(2);
  //   totalPriceElement.textContent = "$" + newTotalPrice;
  // }
  const itemsContainer = document.querySelector(".rebuy-cart__flyout-items");
  const buttons = document.querySelectorAll(".rebuy-button");
  const observer = new MutationObserver(function (itemsList, observer) {
    if (itemsList.some((item) => item.target === itemsContainer)) {
      if (itemsContainer != null) {
        buttons.forEach((button) => {
          button.classList.add("button-active");
          button.classList.remove("button-inactive");
        });
      } else {
        buttons.forEach((button) => {
          button.classList.add("button-inactive");
          button.classList.remove("button-active");
        });
      }
    }
  });
  observer.observe(itemsContainer, { attributes: true, childList: true });
}, 3000);
