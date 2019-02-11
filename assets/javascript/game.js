const artistData = {
"Nirvana": "Smells Like Teen Spirit (1991)",
 "Backstreet Boys": "I Want it That Way(1999)",
 "TLC": "Waterfalls (1994)",
 "MC Hammer": "U Can't Touch This (1990)",
 "Metallica": "Enter Sandman (1991)",
 "Beastie Boys": "Sabotage(1994)",
 "Celine Dion": "My Heart Will Go On(1997)",
 "Radiohead":  "Creep(1993)",
 "Color Me Badd": "I Wanna Sex You Up(1991)",
 "The Fugees": "Killing Me Softly With His Song (1996)",
 "Goo Goo Dolls": "Iris(1998)",
 "Bell Biv Devoe": "Poison (1990)",
 "Kriss Kross": "Jump (1992)",
 "Geto Boys": "Mind Playing Tricks on Me(1991)",
 "Billy Ray Cyrus": "Achy Breaky Heart(1992)",
 "Public Enemy": "911 Is a Joke(1990)",
 "Montell Jordan": "This is How We DO It (1995)",
  }

  class Game90s {
    constructor(remainingAttempts = 6) {
      this.started = false; 
      this.answer = "";     
      this.ansLetters = []; 
      this.ansDisplay = []; 
      this.numWins = 0;       
      this.remaining = remainingAttempts; 
    }

    start(remainingGuess = this.remaining) {
      this.remaining = remainingGuess;
      this.answer = this.pickAnswer(artistData);
      this.ansLetters = this.initAnswerLetters(this.answer);
      this.ansDisplay = this.initAnswerDisplay(this.answer);
      this.started = true;
    }

    pickAnswer(inputData) {
      let arrayData = [];
      for (let name in inputData) {
        arrayData.push(name);
      }
      let ndx = Math.floor(Math.random() * arrayData.length);
  
      return arrayData[ndx];
    }

    initAnswerLetters(ansStr) {
      let ansLetters = [];
      for (let i = 0; i < ansStr.length; i++) {
        let ansChar = ansStr.charAt(i).toLowerCase();
        if (/^\w$/.test(ansChar)) {
          ansLetters.push(ansChar);
        }
      }
  
      return new Set(ansLetters);
    }

    initAnswerDisplay(ansStr) {
      let ansDisplay = [];
      for (let i = 0; i < ansStr.length; i++) {
        let ansChar = ansStr[i];
        ansDisplay[i] = ansChar;
        if (/\w/.test(ansChar)) {
          ansDisplay[i] = "_";
        }
      }
  
      return ansDisplay;
    }
 
    updateGameData(inputChar) {

      if (this.ansLetters.delete(inputChar)) {
        this.updateAnsDisplay(inputChar);
        if (this.userWon()) {
          this.numWins++;
          return true;
        }
      } else {
        this.remaining--;
      }
  
      return false;
    }

    updateAnsDisplay(char) {
      console.log("char: =>" + char + "<- word: " + this.answer);
  
      for (let i = 0; i < this.answer.length; i++) {
        if (this.answer.charAt(i).toLowerCase() === char) {
          this.ansDisplay[i] = this.answer[i];
          console.log("got " + char + "  word: " + this.ansDisplay);
        }
      }
  
      return this.ansDisplay;
    }

    userWon() {
      if (this.ansLetters.size == 0) {
        return true;
      }
      return false;
    }

    hint() {
      return artistData[this.answer];
    }
  }

  class WebElems {
    constructor(game = new Game90s()) {
      this.startMsg = document.getElementById("start");
      this.numWins = document.getElementById("num-wins");
      this.answer = document.getElementById("question");
      this.remaining = document.getElementById("remaining-guesses");
      this.guessed = document.getElementById("already-guessed");
      this.game = game;
    }
 
    handleKeyInput(userInput) {
      console.log("input: " + userInput);
  
      if (this.game.started) {
        this.startMsg.style.visibility = "hidden";
  
        if (/^[\w~!@#$%^&*()_+=,.]$/.test(userInput)) {
          console.log("answer: " + this.game.answer);
          if (this.game.updateGameData(userInput.toLowerCase())) {
            this.start();
            userInput = ""; 
          } else {
            if (this.game.remaining === 0) {
              userInput = "";
            }
          }
          this.updatePage(userInput);
        }
      } else {

        if (this.game.remaining === 0) {
          this.startMsg.style.visibility = "hidden";
        }
        this.start();
      }
    }

    start(remainingGuess = 6) {
      this.game.start(remainingGuess);
      this.guessed.textContent = "";
      this.updatePage("");
      $("#hint").text("");
    }
 
    updatePage(inputChar) {
      this.numWins.textContent = this.game.numWins;
      this.answer.textContent = this.game.ansDisplay.join("");
      this.remaining.textContent = this.game.remaining;
      this.guessed.textContent += inputChar.toUpperCase();
  
      if (this.game.remaining === 0) {
        this.showAnswer();
        this.game.started = false;
      }
    }

    showAnswer() {
      this.answer.textContent = this.game.answer;
      this.startMsg.style.visibility = "visible";
    }
  
    hint() {
      return this.game.hint();
    }
  }
   