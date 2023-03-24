const quantity = document.querySelectorAll("button");
function donations() {
  console.log("holas");
  console.log(quantity);
  quantity.forEach((quant) => {
    quant.addEventListener("click", () => {
      console.log(quant.innerHTML);
    });
  });
}
