module.exports = {
    parser: 'babel-eslint',
    extends: 'airbnb',
    rules: {
        semi: [2, 'never']
    },
    globals: {
        document: true,
        window: true,
    },
}
