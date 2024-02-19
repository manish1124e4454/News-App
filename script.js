const apikey = "71373ebc93fd4192a0dbf0a5cba9b9b8";
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById('Search-input')
const searchButton = document.getElementById('Search-input')


async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=30&apikey=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data); // Log the data to the console
    return data.articles;
  } catch (error) {
    console.log("Error fetching random news", error);
    return [];
  }
}

searchButton.addEventListener("click", async () => {
  const query = searchField.value.trim();
  if (query !== "") {
    try {
      const articles = await fetchNewsQuery(query);
      displayBlogs(articles);
    } catch (error) {
      console.log("error fetching news by query", error);
    }
  }
});

async function fetchNewsQuery(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data); // Log the data to the console
    return data.articles;
  } catch (error) {
    console.log("Error fetching news by query", error);
    return [];
  }
}


function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");

    if (article.urlToImage && article.title && article.description) {
      const img = document.createElement("img");
      img.src = article.urlToImage;
      img.alt = article.title;

      const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "...." : article.title;
      const title = document.createElement("h2");
      title.textContent = truncatedTitle;

      const truncatedDes = article.description.length > 120 ? article.description.slice(0, 120) + "...." : article.description;
      const description = document.createElement("p");
      description.textContent = truncatedDes;

      blogCard.appendChild(img);
      blogCard.appendChild(title);
      blogCard.appendChild(description);
      blogCard.addEventListener('click',()=>{
        window.open(article.url, "-blank")
      })
      blogContainer.appendChild(blogCard);
    }
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error(error);
  }
})();
