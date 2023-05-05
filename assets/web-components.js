class MoneyFormatter extends HTMLElement {
  constructor() {
    super();
    this.timer = null;
    this.timeout = 300;
    this.mutationObserver = null;
  }

  connectedCallback() {
    this.formatMoney();
    this.observeChanges();
  }

  disconnectedCallback() {
    this.disconnectObserver();
  }

  observeChanges() {
    const options = { childList: true, subtree: true, attributes: true };
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach(function (mutation) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-value"
        ) {
          this.formatMoney();
        }
        console.log(mutation.type);
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

  formatMoney() {
    const formattedMoney = window.Rebuy.Cart.formatMoney(
      this.dataset.value,
      "{{ amount_no_decimals }}"
    );
    this.innerHTML = `$${formattedMoney}`;
    console.log(formattedMoney);
  }
}

customElements.define("money-formatter", MoneyFormatter);
