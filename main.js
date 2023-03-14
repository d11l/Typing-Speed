// Selectors
let dropdown = document.querySelector('#Levels');
let lvlName = document.querySelector(".message .lvl");
let seconds = document.querySelector(".message .seconds");
let startBtn = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let input = document.querySelector(".input");
let upcomingWords = document.querySelector(".upcoming-words");
let timeLeft = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");


// Array Of Words
let words = [];
let easywords = [
  "Hello",
  "Code",
  "Dart",
  "Country",
  "Testing",
  "Youtube",
  "Robot",
  "Github",
  "Python",
  "Scala",
  "Cascade",
  "Coding",
  "Funny",
  "Working",
  "Task",
  "Runner",
  "Swift",
  "Java",
  "Rust",
  "Playing"
  ];
 words = [...easywords]
  let normalwords = [...easywords, "Paradigm", "Computer", "Leetcode",  "Styling", "Internet"]
  let hardwords = [...normalwords, "Programming", "Javascript", "Destructuring", "Documentation", "Dependencies"];

// Setting levels  
const levels = {
  "Easy": 6,
  "Normal": 4,
  "Hard":2,
}  

let level =  "Easy" ;
let leveltime = levels[level];

// Setting Level Name + Seconds + Score
lvlName.innerHTML = level;
seconds.innerHTML = leveltime;
timeLeft.innerHTML = leveltime;
scoreTotal.innerHTML = words.length;

// Disable past event
input.onpaste = () => false ;

dropdown.addEventListener("change", () =>{
 
  level = dropdown.options[dropdown.selectedIndex].value;;
  leveltime = levels[level];
  lvlName.innerHTML = level;
  seconds.innerHTML = leveltime;
  timeLeft.innerHTML = leveltime;
  if(level === "Easy"){
    words = easywords;
  }

  if(level === "Normal") {
    words = normalwords ;
   }
   if(level === "Hard" ) {
    words = hardwords
   }
  scoreTotal.innerHTML = words.length;
})






startBtn.onclick = function() {
  this.remove();
  document.querySelector(".choose").remove();
  GenericWord();
  input.focus();
}

function GenericWord(){

  let randomWord = words[Math.floor(Math.random() * words.length)];
  words.splice(words.indexOf(randomWord), 1);
  upcomingWords.innerHTML = '';
  theWord.innerHTML = randomWord;
  input.setAttribute('placeholder',randomWord);
 
  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(words[i]));
    upcomingWords.appendChild(div);
  }

  StartPlay();

}

let F = false; 
function StartPlay(){
  timeLeft.innerHTML = leveltime;
  if(!F){
   F = true; 
   timeLeft.innerHTML = (4+leveltime);
  }
  let start = setInterval(() =>{
    timeLeft.innerHTML--;

    if(timeLeft.innerHTML === "0"){
      
      clearInterval(start);

       if(theWord.innerHTML.toLowerCase() === input.value.toLowerCase()){
             input.value = '';
             scoreGot.innerHTML++;
      
             if(words.length > 0){
              GenericWord()
             
            }else{   

            // win

             let span = document.createElement("span");
             span.className = "good";
             span.appendChild(document.createTextNode("Well done!"));
             finishMessage.appendChild(span);   
             finishMessage.innerHTML+="<br><button onclick='location.reload()'>Restart</button>";   
             
             upcomingWords.querySelectorAll('div').forEach((e) => e.remove());
             upcomingWords.append(finishMessage);
             upcomingWords.querySelector('div').style.backgroundColor = 'transparent';
             theWord.remove();
             input.remove();
            }
      
      
            }
      
      else{
        // lose
        let span = document.createElement("span");
        span.className = "bad";
        span.appendChild(document.createTextNode("Game Over!"));
        finishMessage.appendChild(span);
        finishMessage.innerHTML+="<br><button onclick='location.reload()'>Restart</button>";   

        
        upcomingWords.querySelectorAll('div').forEach((e) => e.remove());
        upcomingWords.append(finishMessage);
        upcomingWords.querySelector('div').style.backgroundColor = 'transparent';
        theWord.remove();
        input.remove();
       }

    }

  } , 1000)


}
