document.addEventListener('DOMContentLoaded', function() {
    const dictionaryDiv = document.createElement('div');
    dictionaryDiv.style.position = 'absolute';
    dictionaryDiv.style.zIndex = '1000';
    dictionaryDiv.style.border = '1px solid #ccc';
    dictionaryDiv.style.background = '#fff';
    dictionaryDiv.style.padding = '10px';
    dictionaryDiv.style.display = 'none';
    document.body.appendChild(dictionaryDiv);

    function wrapWords(selector) {
        document.querySelectorAll(selector).forEach(element => {
            element.innerHTML = element.innerHTML.replace(/\b(\w+)\b/g, '<span class="dictionary-word">$1</span>');
        });
    }

    wrapWords('p');
    wrapWords('.post-body p');

    document.querySelectorAll('.dictionary-word').forEach(word => {
        word.addEventListener('mouseover', function() {
            const wordText = this.textContent;
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordText}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0 && data[0].meanings) {
                        const definition = data[0].meanings[0].definitions[0].definition;
                        dictionaryDiv.innerHTML = `<h3>${wordText}</h3><p>${definition}</p>`;
                        dictionaryDiv.style.display = 'block';
                        dictionaryDiv.style.left = `${this.offsetLeft}px`;
                        dictionaryDiv.style.top = `${this.offsetTop + this.offsetHeight}px`;
                    } else {
                        dictionaryDiv.innerHTML = `<p>No definition found for "${wordText}"</p>`;
                        dictionaryDiv.style.display = 'block';
                        dictionaryDiv.style.left = `${this.offsetLeft}px`;
                        dictionaryDiv.style.top = `${this.offsetTop + this.offsetHeight}px`;
                    }
                });
        });
        word.addEventListener('mouseout', function() {
            dictionaryDiv.style.display = 'none';
        });
    });
});
