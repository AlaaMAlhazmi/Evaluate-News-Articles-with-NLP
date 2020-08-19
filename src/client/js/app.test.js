import "regenerator-runtime/runtime";

// Async Test
test('object fetched should have agreement value', ()=>{
	const {evaluateSentiment} = require('./app.js');
	return evaluateSentiment('http://localhost:8081/sentimentapi', 'https://www.google.com').then(data => {
		expect(data.agreement).toBeTruthy();
	})

})