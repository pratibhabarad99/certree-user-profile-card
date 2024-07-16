module.exports = {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#FFC107',
                secondary: '#ffffff',
                background: '#0F0F0F',
                surface: '#1E1E1E',
                textPrimary: '#ffffff',
                textSecondary: '#B0BEC5',
                netflixRed: '#E50914',
            },
            boxShadow: {
                card: '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
        },
    },
    plugins: [],
};
