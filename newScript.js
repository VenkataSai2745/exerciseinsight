let btnSearch = document.querySelector(".btn");
let counter = document.querySelector(".counter");
let container = document.querySelector(".container");
let btnPrev = document.querySelector(".previous");
let btnNext = document.querySelector(".next");
let pagination=document.querySelector(".pagination")
let searchValue = document.querySelector("#exercise-search");
let count = 1;


btnSearch.addEventListener("click", ()=>{
  
   display()
  count=1
  counter.innerText=count
})

btnNext.addEventListener("click",async ()=>{
  ++count
  btnNext.disabled = true;

  container.innerHTML=""
  console.log(count)
  counter.innerText=count
  await display()
  btnNext.disabled = false; 
})
btnPrev.addEventListener("click",async ()=>{
  if(count>0){
    --count;
    btnNext.disabled = true;
    container.innerHTML=""
    counter.innerText=count
    await display()
    btnNext.disabled = false; 
  }
})

window.addEventListener("load", () => {
  let savedExercises = localStorage.getItem("exercises");
  let containerNotEmpty = localStorage.getItem("containerNotEmpty");

  if (savedExercises) {
    let exercises = JSON.parse(savedExercises);
    render(exercises);
  }

  if (containerNotEmpty === "true") {
    container.style.backgroundImage = "none";
  }
});
  

async function display(){
  let skip=4*(count-1)
  let search=searchValue.value

  pagination.style.display="flex";
  
  container.innerHTML=""

  const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${search}?limit=4&offset=${skip}`;
  const options = {
    method: 'GET',
    headers: {
		'X-RapidAPI-Key': '469ff5f37dmsh0f45d5d5a4d3f00p17486bjsnf0efe3057f8d',
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
	}
};

try {
  const response = await fetch(url, options);
	const result = await response.json();
  localStorage.setItem("exercises", JSON.stringify(result));
  
  render(result)
  if (container.innerHTML != "") {
    container.style.backgroundImage = "none";
    localStorage.setItem("containerNotEmpty", "true");
  } else {
    localStorage.setItem("containerNotEmpty", "false");
  }

} catch (error) {
	console.error(error);
}
}


let render=(result)=>{
  for(let i=0;i<result.length;i++){

    let content=document.createElement("div")
    container.appendChild(content)
    
    let gif=document.createElement("img")
    content.appendChild(gif)
    gif.src=result[i].gifUrl

    let exerciseDesc=document.createElement("div")
    let exerciseName=document.createElement("h1")
    let exerciseImpact=document.createElement("p")

    content.appendChild(exerciseDesc)
    exerciseDesc.appendChild(exerciseName)
    exerciseDesc.appendChild(exerciseImpact)

    exerciseName.innerText=result[i].name;
    exerciseImpact.innerText=result[i].target
    
  }
}