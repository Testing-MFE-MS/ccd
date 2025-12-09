// next.config.ts
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
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
                        './UserCredit': './components/custom-ui/UserCredit.tsx',
                        './WorkingPaper': './components/custom-ui/WorkingPaper.tsx',
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
                    },
                })
            );
        }

        return config;
    },
};

module.exports = nextConfig;