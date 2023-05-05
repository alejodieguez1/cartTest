class MoneyFormatter extends HTMLElement {
  constructor() {
    super();
    this.timer = null;
    this.timeout = 300;
    this.mutationObserver = null;
  }

  connectedCallback() {
    this.format();
    this.observeChanges();
  }

  disconnectedCallback() {
    this.disconnectObserver();
  }

  observeChanges() {
    const options = { childList: true, subtree: true, attributes: true };
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-value"
        ) {
          this.format();
        }
      });
    });
    this.mutationObserver.observe(this, options);
  }

  disconnectObserver() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  debounce(func, timeout) {
    return (...args) => {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  format() {
    const formattedMoney = window.Rebuy.Cart.formatMoney(
      this.dataset.value,
      "{{ amount_no_decimals }}"
    );
    this.innerHTML = `$${formattedMoney}`;
  }
}

customElements.define("money-formatter", MoneyFormatter);

class TieredFeedbackFormatter extends MoneyFormatter {
  format() {
    const moneyVal = this.dataset.value;
    var numb = +moneyVal.match(/\d/g).join("");
    const formattedMoney = window.Rebuy.Cart.formatMoney(
      numb,
      "{{ amount_no_decimals }}"
    );
    this.innerHTML = `$${formattedMoney} ${moneyVal
      .split(" ")
      .slice(1)
      .join(" ")}`;
  }
}
customElements.define("tiered-feedback-formatter", TieredFeedbackFormatter);
