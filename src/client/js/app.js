import {handleError} from './helpers.js';
//* Main Functions *//
//Handle API Call
const evaluateSentiment = async (url='', userUrl='') =>{

	//post entry to server
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({userUrl: userUrl}),
		headers:{
			"Content-type": "application/json; charset=UTF-8"
		}
	});

	let data = await response.json();

	//handle 404 & 500 response
	if(!response.ok){
		throw new Error;
	}

	return data;
}

// Return User Url
const getUserUrl = ()=>{
	const userUrl =  document.getElementById('user-url').value;
	return userUrl;
}

// Update UI
const updateUI = (data)=>{
	const resultDiv = document.getElementById('results');
	resultDiv.innerHTML = ``;
	
	Object.keys(data).forEach(key =>{
		const divElement = document.createElement('div');
		divElement.classList.add(`${key}`);
		divElement.innerHTML = `${key}: ${data[key]}`;
		resultDiv.appendChild(divElement);
	});

	// document.querySelector('.enter').reset();
}


///////////* Execution Starts Here *///////////////

document.addEventListener('DOMContentLoaded', (event) => {
	//When analyse button is clicked
    const analyseButton = document.getElementById('evaluate-page');
    analyseButton.addEventListener('click', async ()=>{

    	try {
    		const userUrl = getUserUrl();
    		const evaluateResult = await evaluateSentiment('/sentimentapi', userUrl);
    		updateUI(evaluateResult);
    	} catch (err){
    		handleError(err);
    	}
    })



});