module.exports = {
  apps: [
    {
      name: "etix",

      script: "./src/index.ts",

      env: {
        NODE_ENV: "production",

        PORT: 8002,
      },

      time: true,
    },
  ],
};
