export default function ThemeScript() {
  const script = `
(function(){
  try {
    var t = localStorage.getItem('vetroots-theme');
    if (t === 'light' || t === 'dark') {
      document.documentElement.setAttribute('data-theme', t);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch(e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
