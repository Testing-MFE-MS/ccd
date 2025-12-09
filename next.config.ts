const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const nextConfig = {
    reactStrictMode: true,
    webpack(config, options) {
        const { isServer } = options;

        if (!isServer) {
            config.plugins.push(
                new NextFederationPlugin({
                    name: 'ccdPage',
                    filename: 'static/chunks/remoteEntry.js',
                    exposes: {
                        './ReportLoanUser': './components/custom-ui/ReportLoanUser.tsx',
                    },
                    shared: {
                        react: {
                            singleton: true,
                            requiredVersion: false,
                            eager: false,
                        },
                        'react-dom': {
                            singleton: true,
                            requiredVersion: false,
                            eager: false,
                        },
                        '@radix-ui/react-slot': {
                            singleton: true,
                            requiredVersion: false,
                        },
                        'class-variance-authority': {
                            singleton: true,
                            requiredVersion: false,
                        },
                        'clsx': {
                            singleton: true,
                            requiredVersion: false,
                        },
                        'tailwind-merge': {
                            singleton: true,
                            requiredVersion: false,
                        },
                    },
                    extraOptions: {
                        exposePages: false,
                    },
                })
            );
        }

        return config;
    },
};

module.exports = nextConfig;