var path = require('path')
const express = require('express')

// environment variables requirments
require('dotenv').config()
const application_key = process.env.API_KEY
// bring window.fetch to Node.js
const fetch = require('node-fetch')
var bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json());
app.use(express.static('../../dist'))

//console.log(__dirname)

app.get('/', function (req, res) {
    //res.sendFile('dist/index.html')
    res.sendFile(path.resolve('../../dist/index.html'))
})


app.post('/sentimentapi', async(req, res) =>{

	try {

		const polarityValues = {
			'P+': 'strong positive',
			'P': 'positive',
			'NEU': 'neutral',
			'N': 'negative',
			'N+': 'strong negative',
			'NONE': 'without sentiment'
		};

		let apiUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${application_key}&url=${req.body.userUrl}&lang=en`;

		let response = await fetch(apiUrl);
		let data = await response.json();

		if(data.status.msg === 'OK'){
			const evaluation = {};
			evaluation.agreement = data.agreement;
			evaluation.confidence = data.confidence;
			evaluation.irony = data.irony;
			evaluation.subjectivity = data.subjectivity;
			evaluation.polarity = polarityValues[data.score_tag];

			res.json(evaluation)

		} else {
			res.json({msg: data.status.msg})
		}
	} catch (err) {
		res.status(500).send({
	      status: 'error',
	    })
	}
	
})
// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
