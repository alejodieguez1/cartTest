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
    const dataVal = this.dataset.value;
    if (dataVal) {
      const value = isNaN(+dataVal) ? +dataVal.match(/\d/g).join("") : dataVal;
      const formattedMoney = window.Rebuy.Cart.formatMoney(
        value,
        "{{ amount_no_decimals }}"
      );
      this.innerHTML = `$${formattedMoney}`;
    }
  }
}

customElements.define("money-formatter", MoneyFormatter);

class TieredFeedbackFormatter extends MoneyFormatter {
  format() {
    const moneyVal = this.dataset.value;
    if (moneyVal) {
      const matchVal = moneyVal.match(
        /\${1}(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?/g
      );

      if (matchVal) {
        const regexVal = matchVal.join("");
        const value = +regexVal.match(/\d/g).join("");
        const formattedMoney = window.Rebuy.Cart.formatMoney(
          value,
          "{{ amount_no_decimals }}"
        );
        var match = moneyVal.replace(regexVal, `$${formattedMoney}`);
        this.innerHTML = match;
      } else {
        this.innerHTML = moneyVal;
      }
    }
  }
}
customElements.define("tiered-feedback-formatter", TieredFeedbackFormatter);

class SuggestionsWidget extends HTMLElement {
  connectedCallback() {
    this.observeChanges();
    this.format();
  }

  disconnectedCallback() {
    this.disconnectObserver();
  }

  observeChanges() {
    const options = { childList: true, subtree: true, attributes: true };
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.target.classList &&
          mutation.target.classList.contains("rebuy-product-block")
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

  format() {
    const containers = this.querySelectorAll(".rebuy-product-block");
    containers.forEach((container) => {
      const prices = container.querySelectorAll(".rebuy-money");
      prices.forEach((price) => {
        var match = /\${1}(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?/g.exec(
          price.textContent
        );
        if (match[0]) {
          const value = price.dataset.value || +match[0].split("$")[1];
          price.dataset.value = value;
          const formattedMoney = window.Rebuy.Cart.formatMoney(
            value,
            "{{ amount_no_decimals }}"
          );
          price.innerHTML = `$${formattedMoney}`;
        }
      });
    });
  }
}
customElements.define("suggestions-widget", SuggestionsWidget);
