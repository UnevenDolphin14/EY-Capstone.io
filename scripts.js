document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value;
        performSearch(query);
    });
});

function performSearch(query) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const apiUrl = `https://api.example.com/articles?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const articles = data.articles;
            const filteredArticles = filterArticles(articles, query);
            displaySearchResults(filteredArticles);
        })
        .catch(error => console.error('Error fetching articles:', error));
}

function filterArticles(articles, query) {
    const tokens = query.toLowerCase().split(/\s+/);
    const regex = new RegExp(tokens.join('|'), 'i');

    return articles.filter(article => {
        return regex.test(article.title) || regex.test(article.description);
    });
}

function displaySearchResults(articles) {
    const searchResultsContainer = document.getElementById('search-results');
    searchResultsContainer.innerHTML = '';

    if (articles.length === 0) {
        searchResultsContainer.innerHTML = '<p>No results found</p>';
        return;
    }

    articles.forEach(article => {
        const articleCard = document.createElement('div');
        articleCard.className = 'article-card';

        const articleImage = document.createElement('img');
        articleImage.className = 'article-card-image';
        articleImage.src = article.image;
        articleImage.alt = article.title;

        const articleContent = document.createElement('div');
        articleContent.className = 'article-card-content';

        const articleTitle = document.createElement('h3');
        articleTitle.innerHTML = `<a href="${article.url}">${article.title}</a>`;

        const articleDescription = document.createElement('p');
        articleDescription.textContent = article.description;

        const articleDate = document.createElement('p');
        articleDate.innerHTML = `<small>${new Date(article.publishedAt).toLocaleDateString()}</small>`;

        articleContent.appendChild(articleTitle);
        articleContent.appendChild(articleDescription);
        articleContent.appendChild(articleDate);
        articleCard.appendChild(articleImage);
        articleCard.appendChild(articleContent);
        searchResultsContainer.appendChild(articleCard);
    });
}
