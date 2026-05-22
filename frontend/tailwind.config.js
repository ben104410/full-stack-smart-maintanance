export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gradient: {
          'blue-start': '#0A3D91',
          'blue-mid': '#1e5aa8',
          'blue-end': '#2a73b8',
        },
      },
      backgroundImage: {
        'gradient-blue': 'linear-gradient(135deg, #0A3D91 0%, #1e5aa8 50%, #2a73b8 100%)',
        'gradient-blue-vert': 'linear-gradient(180deg, #0A3D91 0%, #1e5aa8 50%, #2a73b8 100%)',
        'gradient-blue-soft': 'linear-gradient(135deg, rgba(10, 61, 145, 0.95) 0%, rgba(30, 90, 168, 0.95) 50%, rgba(42, 115, 184, 0.95) 100%)',
      },
    },
  },
  plugins: [],
}
