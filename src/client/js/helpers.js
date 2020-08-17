//Error Handling
export const handleError = (err) =>{
	if (err.message) {
		alert(err.message);
	} else {
		alert('oops, somthing went wrong! please try again later.');
	}
}

