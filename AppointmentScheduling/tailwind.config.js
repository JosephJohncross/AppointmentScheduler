/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: {
        enabled: true,
        content: [
            './Pages/**/*.cshtml',
            './Views/**/*.cshtml'
        ],
    },
  theme: {
      extend: {
          keyframes: {
              modalIn: {
                  from: {
                       //@apply 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95';
                      opacity: '0',
                      transform: 'translateY(16px)'
                  },
                  to: {
                      opacity: '100',
                      transform: 'translateY(0)'
                      //@apply 'opacity-100 translate-y-0 sm:scale-100'
                  }
              },
              modalOut: {
                  from: {
                      opacity: '100',
                      transform: 'translateY(0)'
                      //@apply 'opacity-100 translate-y-0 sm:scale-100';
                  },
                  to: {
                      opacity: '0',
                      transform: 'translateY(1rem)'

                      //@apply 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                  }
              },
               backdropIn: {
                  from: { opacity: '0' },
                  to: { opcaity: '100' }
              },
              backdropOut: {
                  from: { opacity: '0' },
                  to: { opacity: '100' }
              }

          },
          animation: {
              backdropIn: 'ease-out duration-300',
              backdropOut: 'ease-in duration-200',
              modalIn: 'ease-out duration-300',
              modalOut: 'ease-in duration-200',
          }
      },
  },
  plugins: [],
}
