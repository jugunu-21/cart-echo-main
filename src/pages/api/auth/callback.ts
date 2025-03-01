export default async function handler(req, res) {
    // After successful authentication
    try {
        // Register the script tag
        await fetch('/api/scripttags/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Redirect to app home
        res.redirect('/');
    } catch (error) {
        console.error('Installation error:', error);
        res.status(500).json({ error: error.message });
    }
} 