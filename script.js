const weight = document.querySelector("#weight");
const calculate_bmi = document.querySelector(".btn2");
const height = document.querySelector("#height");
const output = document.querySelector(".section4-output");

const bmi = (weightText, heightText) => {
    const sum = weightText / ((heightText / 100) ** 2); // Convert height to meters
    return sum.toFixed(2);
};

calculate_bmi.addEventListener("click", (e) => {
    const weightText = parseFloat(weight.value);
    const heightText = parseFloat(height.value);

    const sum=bmi(weightText, heightText)
    if(sum<18.5){

    output.innerHTML = `Your BMI is: <span>${sum}</span> <br> Your weight is: <span>UnderWeight</span> `;
    }
    else if(sum>18.5 && sum<24.9){
    output.innerHTML = `Your BMI is: <span>${sum}</span> Your Weight is:<span>Normal</span>`;

    }
    else if(sum>25 && sum<29.9){
    output.innerHTML = `Your BMI is: <span>${sum}</span> Your Weight is:<span>OverWeight</span>`;

    }
    else if(sum>30 && sum<34.5){
        output.innerHTML = `Your BMI is: <span>${sum}</span> Your Weight is:<span>Obese</span>`;
    
    }
    else if(sum>35){
        output.innerHTML = `Your BMI is: <span>${sum}</span> Your Weight is:<span>Extremely Obese</span>`;
    
    }
        
});
