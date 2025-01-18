fetch('https://raw.githubusercontent.com/srinivasanonline45/srinisspacestories/refs/heads/main/dictionary-script.js')
  .then(response => response.text())
  .then(scriptContent => {
    const scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.innerHTML = scriptContent;
    document.head.appendChild(scriptElement);
  })
  .catch(error => console.error('Error loading script:', error));
