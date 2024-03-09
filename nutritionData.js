document.addEventListener("DOMContentLoaded", function () {
    const btn = document.querySelector(".button-13");
    const container = document.querySelector(".innercontainer");
    const search = document.querySelector(".search");
    const errorMsg = document.querySelector(".errorMsg");
  
    if (!container) {
      console.error("Container not found");
      return;
    }
  
    btn.addEventListener("click", () => {
      display();
    });
  
    window.addEventListener("load", () => {
      let savedExercises = localStorage.getItem("nutrients");
  
      if (savedExercises) {
        let nutrients = JSON.parse(savedExercises);
        render(nutrients);
      }
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
        }
        else{
          errorMsg.style.display = "none";

        }
        render(result);
      } catch (error) {
        
        errorMsg.style.display = "block";
      }
    }
  
    function render(result) {
      container.innerHTML = "";
      for (let i = 0; i < result.length; i++) {
        for (let key in result[i]) {
          let content = document.createElement("div");
          let contentDesc = document.createElement("div");
          let heading = document.createElement("h1");
          let details = document.createElement("p");
          let contentImage = document.createElement("div");
          let img = document.createElement("img");
          container.appendChild(content);
          content.className = "content";
          contentImage.className = "contentImage";
          content.appendChild(contentDesc);
          content.appendChild(contentImage);
          contentImage.appendChild(img);
          contentDesc.className = "contentDesc";
          contentDesc.appendChild(heading);
          contentDesc.appendChild(details);
  
          heading.innerText += key;
          details.innerText += `${result[i][key]}`;
          img.src =
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        }
      }
    }
  });
  