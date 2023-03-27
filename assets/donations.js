if (document.readyState) {
  setTimeout(() => {
    const buttons = document.querySelectorAll(".donations__button");
    const totalPriceElement = window.Rebuy.Cart.subtotal();
    console.log(totalPriceElement + 100);
    const prices = [1, 2, 5, 10];

    buttons.forEach((button) => {
      button.price = prices[Math.floor(Math.random() * prices.length)];
    });

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        updatePrice(button.price);
      });
    });

    function updatePrice(price) {
      // const totalPrice = Number(
      //   totalPriceElement.textContent.replace(/[^0-9.-]+/g, "")
      // );
      const newTotalPrice = (totalPriceElement + price).toFixed(2);
      totalPriceElement.textContent = "$" + newTotalPrice;
    }
  }, 2000);
}
