if ("webkitSpeechRecognition" in window) { // check if the speechrecognition is supported on 
  //intialize 
  let speechRecognition = new webkitSpeechRecognition(); // create webiktspeechrecognition
  let final_transcript = "";


  speechRecognition.continuous = true; //set speech recongition on continous meaning it continue listen until the user stops 
  speechRecognition.interimResults = true;//display the result of the user input and it will continue and the user stops
  
  //You need to select language from  the Dialect select menu and use its value for the language property.
  speechRecognition.lang = document.querySelector("#select_dialect").value;

  //lets trigger the start of our speech recongition 
  speechRecognition.onstart = () => {
    document.querySelector("#status").style.display = "block";
  };
  //event is triggered when there is some sort of error in speech recognition.
  speechRecognition.onerror = () => {
    document.querySelector("#status").style.display = "none";
    console.log("Speech Recognition Error");
  };
  //event is triggered when a user end the speech 
  speechRecognition.onend = () => { 
    document.querySelector("#status").style.display = "none";
    console.log("Speech Recognition Ended");
  };
  //Let’s declare a variable for the final transcript outside the callback function 
  //and a variable for the interim transcript inside the callback function

  //event is triggered when the speechRecognition object has some results from the recognition
  speechRecognition.onresult = (event) => {
    let interim_transcript = "";
   // Loop through the results from the speech recognition object.
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
      if (event.results[i].isFinal) {
        if (event.results[i].includes("open youTube")) {
          console.log("opening youtube");
          window.open("https://www.youtube.com/");
        }
        p = document.createElement("p");
        final_transcript += event.results[i][0].transcript; //display the enter final  result of user input 
      } 
      else {
        interim_transcript += event.results[i][0].transcript;//display the result and continue listening until user stops 
      }
      // else  (event.results["open my YouTube"].isFinal ) {
      // //   // p = document.createElement("p");
      // //   // p.classList.add("replay");
      // //   // p.innerText = "opening youtube channel";
      // //   // result.appendChild(p);
      // console.log("opening youtube");
      // window.open("https://www.youtube.com/channel/UCdxaLo9ALJgXgOUDURRPGiQ");
      // }
    }
    //Finally, let’s update the DOM with the transcript values
    document.querySelector("#final").innerHTML = final_transcript;
    document.querySelector("#interim").innerHTML = interim_transcript;
  };
 // Finally, let’s start and stop the recognition.
 //We need to set the onClick property of the start and stop buttons to start and stop the speech recognition.
  document.querySelector("#start").onclick = () => {
    speechRecognition.start();
  };
  document.querySelector("#stop").onclick = () => {
    speechRecognition.stop();
  };
} else {
  console.log("Speech Recognition Not Available");
}
