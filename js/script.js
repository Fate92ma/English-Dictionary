// Dom Variables

let input = document.getElementsByTagName("input")[0],

    inputValue,

    wordInfo = document.getElementsByClassName("wordInfo")[0],

    words = document.getElementsByClassName("words")[0],

    // Data Variables

    myRequest,

    myData;

// Events

input.addEventListener("keypress", getWord);

// function to get user word to search for its definition
function getWord() {

    inputValue = input.value.trim();

    // if input box isn't empty
    if (inputValue != '') {

        // if key pressed is 'Enter'
        // run function to get data
        if (event.keyCode == 13) getData()

    }

    //
    else return false

}

// function to get data for a word
function getData() {

    myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {

        // if status code is 'Ok'
        if (this.readyState == 4 && this.status == 200) {

            myData = JSON.parse(this.responseText)

            // display data in dom
            drawInUI(myData, wordInfo, words)

        }

        // if status code isn't 'Ok'
        if (this.readyState == 4 && this.status != 200) {

            myData = JSON.parse(this.responseText)

            // display an error
            drawError(myData, wordInfo, words)

        }

    }

    myRequest.onerror = function () {
        throw 'Request Failed'
    }

    myRequest.open("GET", `https://owlbot.info/api/v4/dictionary/${inputValue}`, true);

    myRequest.setRequestHeader('Authorization', 'Token 3a60514b6780c713ba708111ac84844ea5ccff55');

    myRequest.send();

}

// function to draw data in dom
function drawInUI(object, whereToDraw1, whereToDraw2) {

    // display basic data about a 'word'
    let word = object.word,
        pronunciation = object.pronunciation,
        definitions = object.definitions;

    whereToDraw1.innerHTML = '';

    whereToDraw1.innerHTML =
        `<p><strong>Word: </strong> ${word}</p>
<p><strong>Pronunciation: </strong> <span>${pronunciation}</span></p>
<p><strong>Result: </strong> ${definitions.length}</p>`;

    whereToDraw2.innerHTML = '';

    // display every definition of a 'word'
    definitions.map((item) => {

        let type = item.type,
            definition = item.definition,
            example = item.example;

        whereToDraw2.innerHTML += `<div>
                                     <p><strong>Type: </strong> ${type}</p>
                                     <p><strong>Definition: </strong> ${definition}</p>
                                     <p><strong>Example: </strong> ${example}</p>
                                   </div>`

    })

}

// function to run if there is no data to draw
function drawError(array, clearDiv, whereToDraw) {

    // get error message from data
    let message = array.map(item => item.message)

    clearDiv.innerHTML = '';

    whereToDraw.innerHTML = '';

    // display it
    whereToDraw.innerHTML = `<center>${message}</center>`

}