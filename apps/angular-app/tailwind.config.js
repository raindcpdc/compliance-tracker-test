/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@spartan-ng/ui-core/hlm-tailwind-preset')],
  content: ["./src/**/*.{html,js,ts}",
    "./src/shared/components/ui/**/*.{html,js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}