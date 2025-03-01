// This is the script that will be injected into Shopify's cart page
class CartSurvey {
    constructor() {
        // Only initialize on Shopify cart page
        if (window.Shopify && window.location.pathname.includes('/cart')) {
            this.init();
        }
    }

    init() {
        const cartForm = document.querySelector('form[action="/cart"]');
        if (!cartForm) return;

        const surveyContainer = document.createElement('div');
        surveyContainer.innerHTML = `
      <div class="survey-wrapper">
        <h3>Quick Survey</h3>
        <p>How did you discover our store?</p>
        <div style="display: flex; gap: 10px; margin-top: 10px;">
          <label>
            <input type="radio" name="discovery" value="social"> Social Media
          </label>
          <label>
            <input type="radio" name="discovery" value="search"> Search Engine
          </label>
          <label>
            <input type="radio" name="discovery" value="friend"> Friend
          </label>
        </div>
      </div>
    `;

        cartForm.insertAdjacentElement('beforeend', surveyContainer);

        // Add event listeners
        surveyContainer.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', this.handleResponse.bind(this));
        });
    }

    async handleResponse(event) {
        try {
            const response = await fetch('https://cart-echo-main.vercel.app/api/survey/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    answer: event.target.value,
                    cartToken: window.Shopify?.cart?.token
                })
            });

            if (!response.ok) throw new Error('Failed to submit survey');

            // Show thank you message
            event.target.closest('.survey-wrapper').innerHTML = `
        <p style="text-align: center; padding: 10px;">Thank you for your feedback!</p>
      `;
        } catch (error) {
            console.error('Error submitting survey:', error);
        }
    }
}

// Initialize only on Shopify cart page
if (!window.location.href.includes('vercel.app')) {
    new CartSurvey();
} 