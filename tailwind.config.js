/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './projects/shell/src/**/*.{html,ts}',
    './projects/admin/src/**/*.{html,ts}',
    './styles/**/*.css',
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      boxShadow: {
        panel: '0 28px 90px rgba(15, 23, 42, 0.18)',
      },
    },
  },
  plugins: [],
};
