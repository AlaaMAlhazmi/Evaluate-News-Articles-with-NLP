//Error Handling
export const handleError = (err) =>{
	if (err.message) {
		alert(err.message);
	} else {
		alert('oops, somthing went wrong! please try again later.');
	}
}

export const validateForm = (event)=>{

	const inputForm = document.querySelector('.needs-validation');
	const urlInput = document.getElementById('user-url');

	//if url not correct, Set Validation Massege
	if(urlInput.validity.patternMismatch){
		urlInput.nextElementSibling.innerHTML = 'You didn\'t add the URL, Please check the URL and try again';
	};

	//handling validation
	if (inputForm.checkValidity() === false){
		event.preventDefault();
		event.stopPropagation();

		inputForm.classList.add('was-validated');

		return false;

	}else{
		document.querySelector('.needs-validation').classList.remove('was-validated');
		return true;
	}
}

export const sum = (num1, num2)=>{
	return num1 + num2;
}