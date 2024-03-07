let btn = document.querySelector(".btn");
let container = document.querySelector(".container");
const loading =document.querySelector(".loading")

let btn1=document.querySelector(".next")
let btn2=document.querySelector(".previous")
let counter=document.querySelector(".counter")
let count=1


btn1.addEventListener(("click"),()=>{
  ++count
  console.log(count)
  container.innerHTML=""
  render()
})

btn2.addEventListener("click",()=>{
  if(count>0){

      --count
      console.log(count)
      
          container.innerHTML=""
          render()
      
  }
})


window.addEventListener("load", () => {
  let savedExercises = localStorage.getItem("exercises");
  if (savedExercises) {
    let exercises = JSON.parse(savedExercises);
    render(exercises);
  }
});

btn.addEventListener("click", async () => {
 
  let search = document.querySelector("#exercise-search");
  if (search.value.trim() !== "") {
    const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${search.value}?limit=5&skip=${skip}`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "469ff5f37dmsh0f45d5d5a4d3f00p17486bjsnf0efe3057f8d",
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      loading.style.display="none"

      // Save result to localStorage
      localStorage.setItem("exercises", JSON.stringify(result));

      render(result);
    } catch (error) {
      console.error(error);
    }
  }
});

let render = (result) => {
  
  container.innerHTML = "";
  for (let i = 0; i < result.length; i++) {
    let content = document.createElement("div");
    content.className = "content";

    let img = document.createElement("img");
    let gifUrl = result[i].gifUrl;
    img.src = gifUrl;
    content.appendChild(img);

    let paragraph = document.createElement("p");
    let exerciseName = result[i].name;
    paragraph.innerText = exerciseName;
    content.appendChild(paragraph);

    let targetPart = document.createElement("p");
    let targetPartName = result[i].target;
    targetPart.innerText = targetPartName;
    content.appendChild(targetPart);

    const pTags = content.getElementsByTagName("p");
    pTags[1].classList.add("impactPart");
    pTags[0].classList.add("exerciseName");

    if (container) {
      container.appendChild(content);
    } else {
      console.error("Container not found");
    }
  }
};
