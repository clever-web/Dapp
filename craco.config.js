const path = require(`path`);

module.exports = {
	webpack: {
		alias: {
			'ABI': path.resolve(__dirname, 'src/abi'),
			'ASSETS': path.resolve(__dirname, 'src/assets'),
			'COMPONENTS': path.resolve(__dirname, 'src/components'),
			'CONTAINERS': path.resolve(__dirname, 'src/containers'),
			'PAGES': path.resolve(__dirname, 'src/pages'),
			'HOOKS': path.resolve(__dirname, 'src/hooks'),
			'SHARED': path.resolve(__dirname, 'src/shared'),
			'ROUTES': path.resolve(__dirname, 'src/routes'),
			'SCSS': path.resolve(__dirname, 'src/scss'),
			'SERVICES': path.resolve(__dirname, 'src/services'),
			'CONTEXT': path.resolve(__dirname, 'src/context'),
			'UTILS': path.resolve(__dirname, 'src/utils'),
		},
	},
};
