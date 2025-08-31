let currentPage = 1;
const projectPerPage = 6;
let allProjects = [];
let filteredProjects = [];

async function loadProjects() {
    fetch("projects.json")
      .then(response => response.json())
      .then(projects => {
        // Trier par date (du plus récent au plus ancien)
        allProjects = projects.srot((a, b) => new Date(b.date) - new Date(a.date))
        filteredProjects = [...allProjects]; // au début, pas de filtre
        renderArticles();
      })
      .catch(error => console.error(error));
  }