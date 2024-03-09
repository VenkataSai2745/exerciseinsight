const btn = document.querySelector(".button-13");
const container = document.querySelector(".innercontainer");
const search = document.querySelector(".search");
const errorMsg = document.querySelector(".errorMsg");

btn.addEventListener("click", () => {
  display();
});

async function display() {
  const url = `https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=${search.value}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "469ff5f37dmsh0f45d5d5a4d3f00p17486bjsnf0efe3057f8d",
      "X-RapidAPI-Host": "nutrition-by-api-ninjas.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    const result = await response.json();
    localStorage.setItem("nutrients", JSON.stringify(result));
    if (result.length === 0) {
      errorMsg.style.display = "block";
    } else {
      errorMsg.style.display = "none";
    }
    const imgUrl = await fetchImages(search.value);
    render(result, imgUrl);
  } catch (error) {
    errorMsg.style.display = "block";
  }
}

async function render(result, imgUrl) {
  container.innerHTML = "";
  try {
    for (let i = 0; i < result.length; i++) {
      let index = 0;

      for (let key in result[i]) {
        if (index === 4) {
          index++;
          continue;
        }

        let content = document.createElement("div");
        content.className = "content";

        let contentDesc = document.createElement("div");
        contentDesc.className = "contentDesc";

        let heading = document.createElement("h1");
        let details = document.createElement("p");
      
        container.appendChild(content);
        content.appendChild(contentDesc);

        contentDesc.appendChild(heading);
        contentDesc.appendChild(details);

        heading.innerText += key;
        details.innerText += `${result[i][key]}`;
    
        content.style.backgroundImage = `url(${imgUrl})`;

        index++;
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function fetchImages(searchValue) {
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos/?query=${searchValue}&client_id=${accessKey}&w=250&h=250`);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const random = Math.floor(Math.random() * data.results.length);
      const images = data.results[random];
      const imageUrl = images.urls.regular;
      return imageUrl;
    } else {
      throw new Error("No images found");
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

const accessKey = 'ST9cMBWzUfWjA4pMPlfhZOHg0CpO8nBeD-Lagx7CnuU';
