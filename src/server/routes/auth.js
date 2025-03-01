// After successful app installation
app.post('/api/auth/callback', async (req, res) => {
    // ... existing auth code ...

    // Register script tag after installation
    try {
        await shopify.scriptTag.create({
            session: res.locals.shopify.session,
            data: {
                event: 'onload',
                src: 'https://cart-echo-main.vercel.app/survey-script.js',
                display_scope: 'cart_page'
            }
        });
    } catch (error) {
        console.error('Failed to create script tag:', error);
    }
}); 