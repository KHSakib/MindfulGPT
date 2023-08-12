const API_KEY = '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'
const submitButton = document.querySelector('#submit')
const outPutElement = document.querySelector('#output')
const inputElement = document.querySelector('input')
const historyElement = document.querySelector('.history')
const buttonElement = document.querySelector('button')

function changeInput(value) {
    const inputElement = document.querySelector('input')
    inputElement.value = value
}


async function getMessage() {
    console.log('clicked')
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "davinci:ft-personal-2023-08-01-08-02-29",
            prompt: inputElement.value,
            temperature: 1,
            max_tokens: 50,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: ["."]
    }) 
    }
    try {
        const response = await fetch('https://api.openai.com/v1/completions', options)
        const data = await response.json()
        console.log(data)
        outPutElement.textContent = data.choices[0].text
        if (data.choices[0].text && inputElement.value){
            const pElemnt = document.createElement('p')
            pElemnt.textContent = inputElement.value
            pElemnt.addEventListener('click', () => changeInput(pElemnt.textContent))
            historyElement.append(pElemnt)
        }
    } catch (error){
        console.error(error)
    }
}


submitButton.addEventListener('click', getMessage)
// Add event listener for "Enter" key press
inputElement.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        // Trigger the click event for the submit button
        submitButton.click();
    }
});

function clearInput(){
    inputElement.value = ''
}

buttonElement.addEventListener('click', clearInput)