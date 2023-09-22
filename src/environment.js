const Environment = {
    CORS: {
        ORIGINS_DEV: [
            'http://localhost:3001',
            'http://localhost:3000',
        ],
        ORIGINS_PRO: [
            'https://ecommercead-cfaf5.web.app',
            'https://ecommercead-cfaf5.firebaseapp.com',
            'https://ecommerce-6d965.web.app',
            'https://ecommerce-6d965.firebaseapp.com'
        ]
    },
    PERMISSION: {
        DEV: ['Admin', 'Counselors'],
        PRO: ['Admin', 'Counselors']
    },
    PORT: 8080,
}

module.exports = Environment;