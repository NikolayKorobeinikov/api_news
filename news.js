const buttons = document.querySelectorAll(".btn");
const notes = document.querySelector(".article");

buttons.forEach((element) => {
  element.addEventListener("click", () => {
    let newsCategory = element.textContent
    getNews(newsCategory)
  });
});

function getNews(newsCategory) {
    const newsRequest = (newsCategory == undefined)? "general" : newsCategory 
    const API = `https://newsapi.org/v2/top-headlines?country=us&category=${newsRequest}&apiKey=54e358addd7f464ba015e110a3e1f62f`;
    try {
        const request = async () => {
          await fetch(API)
            .then((type) => type.json())
            .then((getNews) => data(getNews));
        };
        request();
      } catch (error) {
        console.log("Mistake");
      }
}
getNews();

function data(getNews) {
  console.log(getNews);
  const articles = getNews.articles;
  notes.innerHTML = " ";
  articles.forEach((article) => {
    const textArticle =
      article.author == null ||
      article.description == null ||
      article.urlToImage == null ||
      article.content == null
        ? "container__text"
        : " ";
    if (article.description !== null) {
      const newArticle =
        article.description.length > 150 ? "text__article" : " ";
      notes.innerHTML += `
      <div class="container ${textArticle}">
       <div class="picture">
        <img src=${article.urlToImage} alt="image">
       </div>
       <div class="position">
        <h3 class="title">${article.title}</h3>
        <p class="desc ${newArticle}">${article.description}</p>
        <div class="link">
        <a href=${article.url} class="link">Read more...</a>
       </div>
      </div>
      </div>
      `;
    }
  });
}