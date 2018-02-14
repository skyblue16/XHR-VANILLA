//es con DOM , ABAJO ESTA CON JQUERY
const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchForText;

form.addEventListener('submit', function (e) {
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchForText = searchField.value;
    getNews();
  });

function getNews() {
    const articleRequest = new XMLHttpRequest();
    articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchForText}&api-key=6581e6b8ee894aa09a9434def8eed9ca`);
    articleRequest.onload = addNews;
    articleRequest.onerror = handleError;
    articleRequest.send();
}



function addNews() {
    const data = JSON.parse(this.responseText);
    const articles = data.response.docs;
    articles.forEach(article => {
        const title = article.headline.main;
        const snippet = article.snippet;
        const url = article.web_url;
        let h4 = document.createElement('h4');
        let li = document.createElement('li');
        let a = document.createElement('a');
        h4.className = 'titulos'
        li.className = 'articleClass';
        li.innerText = snippet;
        a.innerText = title;
        a.setAttribute('href', url);

        h4.appendChild(a);
        responseContainer.appendChild(h4);
        responseContainer.appendChild(li);
    });
}
function handleError() {
    console.log('se ha presentado un error');
}


