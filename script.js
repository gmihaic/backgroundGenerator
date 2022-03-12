var css = document.querySelector("h3");

var color1 = document.querySelector(".color1");

var color2 = document.querySelector(".color2");

var body = document.querySelector("body");

function updateCssTextInfo()
{
    css.textContent = getComputedStyle(body).background + ";";
}

function setGradient() {
    body.style.background = "linear-gradient(to right, " + color1.value + ", " + color2.value + ")";
    updateCssTextInfo();
}

function rgbToHex(nr) {    
    var nrHex = Math.abs(nr).toString(16).padStart(2, '0');    
    //console.log(nr + " " + nrHex);
    return nrHex;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

var randomGradient = function() {
    this.r = getRandomInt(0,255);
    this.g = getRandomInt(0,255);
    this.b = getRandomInt(0,255);

    this.getHex = function() {
        return "#" + rgbToHex(this.r) + rgbToHex(this.g) + rgbToHex(this.b);
    }
};

var generatePause = false;
function generateRandomGradient(){
   
    if (generatePause)
    {
        return false;
    }

    generatePause = true;

    var gradient_start = new randomGradient();
    var gradient_stop = new randomGradient();

    //console.log(gradient_start.getHex());
    //console.log(gradient_stop.getHex());

    color1.value = gradient_start.getHex();
    color2.value = gradient_stop.getHex();
    setGradient();
}

//color1.addEventListener("input", setGradient);
//color2.addEventListener("input", setGradient);

var inputs = document.querySelectorAll("input");

inputs.forEach(function(item){
    item.addEventListener("input", setGradient);
});

// colour inputs match the background generated on the first page load. 
window.addEventListener('load', function(event){
    var currentBodyStyle = getComputedStyle(body);
    //console.log(currentBodyStyle.background);   
     
    var regex = /linear\-gradient\(to\ right\,\ rgb\((\d+)\,\ (\d+)\,\ (\d+)\)\,\ rgb\((\d+)\,\ (\d+)\,\ (\d+)\)\)/;  
    var regex_results = currentBodyStyle.background.match(regex);
    
    if (regex_results && regex_results.length >= 6)
    {
        //console.log(regex_results);

        var colorsArr = [
            {"r": regex_results[1], "g": regex_results[2], "b": regex_results[3]},
            {"r": regex_results[4], "g": regex_results[5], "b": regex_results[6]}
        ];        

        var colorsHex = [];
        
        colorsArr.forEach(function(item){
            item.r = rgbToHex(item.r);
            item.g = rgbToHex(item.g);
            item.b = rgbToHex(item.b);

            colorsHex.push("#" + item.r + item.g + item.b);
        });

        //console.log(colorsHex);

        color1.value = colorsHex[0];
        color2.value = colorsHex[1];
    }

    updateCssTextInfo();
});

var generateBtn = document.querySelector("#generateRandomBtn");

generateBtn.addEventListener("click", function(){
    generateRandomGradient();
    generateBtn.classList.add("generateBtnActive");

    setTimeout(function(){
        generateBtn.classList.remove("generateBtnActive");
        generatePause = false;
    }, 500);
});