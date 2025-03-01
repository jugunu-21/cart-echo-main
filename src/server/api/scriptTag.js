// Endpoint to register script tag with Shopify
app.post('/api/scripttags', async (req, res) => {
    try {
        const scriptTag = await shopify.scriptTag.create({
            session: res.locals.shopify.session,
            data: {
                event: 'onload',
                src: 'https://cart-echo-main.vercel.app/survey-script.js',
                display_scope: 'cart_page'
            }
        });
        res.status(200).json(scriptTag);
    } catch (error) {
        console.error('Failed to create script tag:', error);
        res.status(500).json({ error: error.message });
    }
}); 