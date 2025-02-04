const apiKey= '84f057d47fb34341927dadd2c19422c6';

const blogContainer= document.getElementById("blog-container");

const searchField =document.getElementById('search-input');
const searchButton = document.getElementById('search-button');


async function fetchRandomNews(){
    try{
        const apiUrl =`https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
        

    }catch(error){
        console.error("Error fetching randow news",error);
        return[];

    }
}
searchButton.addEventListener('click',async ()=>{
    const Query = searchField.value.trim()
    if (Query !==""){
        try{
            const articles=await fetchNewsQuery(Query)
            displayBlogs(articles)

        }
        catch(error){
            console.error("Error fetching news by query",error);
        }

    }


})

async function fetchNewsQuery(Query){
    try{
        const apiUrl =`https://newsapi.org/v2/everything?q=${Query}&pageSize=20&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
        

    }catch(error){
        console.error("Error fetching randow news",error);
        return[];

    }

}

function displayBlogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage || 'default_image_url.jpg';  
        img.alt = article.title || 'No title available';

        const title = document.createElement("h2");
        const truncatedTitle = article.title && article.title.length > 30 
            ? article.title.slice(0, 30) + "..." 
            : article.title || 'No title available';
        title.textContent = truncatedTitle;

        const description = document.createElement("p");
        const truncatedDescription = article.description && article.description.length > 100 
            ? article.description.slice(0, 100) + "..." 
            : article.description || 'No description available';
        description.textContent = truncatedDescription;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        
        blogCard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });

        blogContainer.appendChild(blogCard);
    });
}

(async()=>{

    try{
       const articles= await fetchRandomNews();
       displayBlogs(articles);

       
    }catch(error){
        console.error("Error fetching random news",error);

    }
})();