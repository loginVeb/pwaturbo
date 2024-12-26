import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});

export default withPWA({
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups.commons = {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        chunks: 'all',
      };
    }
    return config;
  },
  images: {
    domains: ['example.com'],
  },
  webpackDevMiddleware: config => {
    return config;
  },
  // Добавьте другие настройки Next.js здесь, если они есть
});