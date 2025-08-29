
let currentPage = 1;
const articlesPerPage = 6;
let allArticles = [];
let filteredArticles = [];

async function loadArticles() {
  fetch("articles.json")
    .then(response => response.json())
    .then(articles => {
      // Trier par date (du plus récent au plus ancien)
      allArticles = articles.sort((a, b) => new Date(b.date) - new Date(a.date));
      filteredArticles = [...allArticles]; // au début, pas de filtre
      renderArticles();
    })
    .catch(error => console.error(error));
}

function renderArticles() {
  let container = document.getElementById("blog-grid");
  //let paginationContainer = document.getElementById("pagination");
  container.innerHTML = "";
  //paginationContainer.innerHTML = "";

  // Calcul des indices pour la pagination
  let start = (currentPage - 1) * articlesPerPage;
  let end = start + articlesPerPage;
  let paginatedArticles = filteredArticles.slice(start, end);

  // Afficher les articles de la page courante
  if (paginatedArticles.length === 0) {
    container.innerHTML = "<article>Aucun article trouvé.</article>";
    return;
  }

  paginatedArticles.forEach(article => {
    let newArticle = document.createElement("article");
    newArticle.style.cssText = `
                    margin: 10px;
                `
    //li.innerHTML = `<a href="article.html?id=${article.id}">${article.title}</a> <small>(${article.date})</small>`;
    
    newArticle.innerHTML = `<!--<article class="blog-card"> -->
                    <!-- Title in 60 characters at most-->
                    <h2 class="blog-title"><a href="article.html?id=${article.id}">${article.title}</a></h2>
                    <p class="blog-excerpt">
                        ${countExcerpt(article.excerpt)}...
                    </p>
                    <div class="blog-tags">
                        <span class="tag">${article.tags[0]}</span>
                        <span class="tag">${article.tags[1]}</span>
                        <span class="tag">${article.tags[2]}</span>
                    </div>
                    <div class="blog-meta">📅 ${formatDate(article.date)} • ⏱️ ${article.readingTime} min</div>
                    <!--<a href="article.html?id=${article.id}" class="btn-secondary">Lire l'article</a>-->
                <!-- </article>-->`;
    container.appendChild(newArticle);
  });

  // Pagination
  let totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  if (totalPages > 1) {
    if (currentPage > 1) {
      //let prevBtn = document.createElement("button");
      //prevBtn.textContent = "← Précédent";
      let prevBtn = document.getElementById("previous-page");
      prevBtn.style.visibility = "visible";
      
      prevBtn.onclick = () => {
        currentPage--;
        renderArticles();
      };
      //paginationContainer.appendChild(prevBtn);
    } else { document.getElementById("previous-page").style.visibility = "hidden"; }
    

    //let pageInfo = document.createElement("span");
    //pageInfo.textContent = ` Page ${currentPage} sur ${totalPages} `;
    //paginationContainer.appendChild(pageInfo);
    let pageInfo = document.getElementById("current-page");
    pageInfo.style.visibility = "visible";
    pageInfo.innerHTML = `Page ${currentPage} sur ${totalPages}`;

    if (currentPage < totalPages) {
      //let nextBtn = document.createElement("button");
      //nextBtn.textContent = "Suivant →";
      let nextBtn = document.getElementById("next-page");
      nextBtn.style.visibility = "visible";
      
      nextBtn.onclick = () => {
        currentPage++;
        renderArticles();
      };
      //paginationContainer.appendChild(nextBtn);
    } else { document.getElementById("next-page").nextBtn.style.visibility = "hidden"; }
  }
}

function applySearch() {
  let query = document.getElementById("search").value.toLowerCase();
  if (query.trim() === "") {
    filteredArticles = [...allArticles]; // reset
  } else {
    filteredArticles = allArticles.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.content.toLowerCase().includes(query)
    );
  }
  currentPage = 1; // revenir à la 1ère page
  renderArticles();
}

function countExcerpt(string) {
	truncatedValue = ""
	if (string.length > 120){
		for (let i=0; i< 121; i++) {
			truncatedValue += string[i]
		}
		return truncatedValue
	}
	return string
}

function formatDate(dateString) {
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            return new Date(dateString).toLocaleDateString('fr-FR', options);
        }
