const React = require('react');

exports.onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    React.createElement('script', {
      key: 'darkMode',
      dangerouslySetInnerHTML: {
        __html: `
        (()=>{
          let defaultTheme = 'LIGHT';
          const savedTheme = window.localStorage.getItem('THEME');
          if (savedTheme) {
            document.body.className = savedTheme;
          } else {
            const isDarkMode =
              window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            defaultTheme = isDarkMode ? 'DARK' : 'LIGHT';
            document.body.className = defaultTheme;
          }
        })()
        `,
      },
    }),
  ]);
};
