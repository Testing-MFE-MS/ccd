import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';
import NextFederationPlugin from '@module-federation/nextjs-mf';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    webpack(config: Configuration, options: { isServer: boolean }) {
        const { isServer } = options;

        if (!isServer) {
            config.plugins = config.plugins || [];
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
                        // Match all Radix UI components with Master
                        '@radix-ui/react-select': {
                            singleton: true,
                            requiredVersion: false,
                        },
                        '@radix-ui/react-slot': {
                            singleton: true,
                            requiredVersion: false,
                        },
                        '@radix-ui/react-label': {
                            singleton: true,
                            requiredVersion: false,
                        },
                        '@radix-ui/react-checkbox': {
                            singleton: true,
                            requiredVersion: false,
                        },
                        '@radix-ui/react-dialog': {
                            singleton: true,
                            requiredVersion: false,
                        },
                        '@radix-ui/react-tabs': {
                            singleton: true,
                            requiredVersion: false,
                        },
                        '@radix-ui/react-accordion': {
                            singleton: true,
                            requiredVersion: false,
                        },
                        '@radix-ui/react-popover': {
                            singleton: true,
                            requiredVersion: false,
                        },
                        '@radix-ui/react-radio-group': {
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
                        'lucide-react': {
                            singleton: true,
                            requiredVersion: false,
                        },
                        'date-fns': {
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

export default nextConfig;