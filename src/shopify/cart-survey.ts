class CartSurvey {
    private container: HTMLElement | null = null;
    private formData: any = {};

    constructor() {
        this.init();
    }

    private async init() {
        // Wait for the cart page to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.injectSurveyForm());
        } else {
            this.injectSurveyForm();
        }
    }

    private async injectSurveyForm() {
        // Find the cart form - this is where we'll inject our survey
        const cartForm = document.querySelector('form[action="/cart"]');
        if (!cartForm) return;

        // Create container for our survey
        this.container = document.createElement('div');
        this.container.id = 'shopify-cart-survey';
        this.container.className = 'cart-survey-container';

        // Add some basic styles
        const styles = document.createElement('style');
        styles.textContent = `
      .cart-survey-container {
        margin: 20px 0;
        padding: 15px;
        border: 1px solid #e8e8e8;
        border-radius: 8px;
      }
      .survey-question {
        margin-bottom: 15px;
      }
      .survey-options {
        display: flex;
        gap: 10px;
      }
    `;
        document.head.appendChild(styles);

        // Create the survey content
        this.container.innerHTML = `
      <div class="survey-question">
        <h3>Help us serve you better!</h3>
        <p>How did you discover our products?</p>
        <div class="survey-options">
          <label>
            <input type="radio" name="discovery" value="social">
            Social Media
          </label>
          <label>
            <input type="radio" name="discovery" value="search">
            Search Engine
          </label>
          <label>
            <input type="radio" name="discovery" value="friend">
            Friend Recommendation
          </label>
          <label>
            <input type="radio" name="discovery" value="other">
            Other
          </label>
        </div>
      </div>
    `;

        // Insert the survey before the cart checkout button
        const checkoutButton = cartForm.querySelector('[name="checkout"]');
        if (checkoutButton) {
            checkoutButton.parentElement?.insertBefore(this.container, checkoutButton);
        } else {
            cartForm.appendChild(this.container);
        }

        // Add event listeners
        this.attachEventListeners();
    }

    private attachEventListeners() {
        if (!this.container) return;

        const radioButtons = this.container.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', (e) => {
                const target = e.target as HTMLInputElement;
                this.formData.discovery = target.value;
                this.submitSurveyData();
            });
        });
    }

    private async submitSurveyData() {
        try {
            // Replace with your actual API endpoint
            const response = await fetch('/apps/cart-survey/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...this.formData,
                    timestamp: new Date().toISOString(),
                    cartToken: (window as any).Shopify?.cart?.token || null,
                }),
            });

            if (!response.ok) {
                console.error('Failed to submit survey data');
            }
        } catch (error) {
            console.error('Error submitting survey:', error);
        }
    }
}

// Initialize the survey when the script loads
new CartSurvey(); 