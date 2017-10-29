import React, {Component} from 'react';
import SingleInput from '../components/SingleInput';

class FormContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ownerName: '',
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);
		this.handleFullNameChange = this.handleFullNameChange.bind(this);
	}
	componentDidMount() {
		fetch('./fake_db.json')
			.then(res => res.json())
			.then(data => {
				this.setState({
					ownerName: data.ownerName,
				});
			});
	}
	handleFullNameChange(e) {

		this.setState({ ownerName: e.target.value }, () => console.log('name:', this.state.ownerName));

	}
	handleClearForm(e) {
		e.preventDefault();
		this.setState({
			ownerName: '',
		});
	}
	handleFormSubmit(e) {
		e.preventDefault();


		const formPayload = {
			var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
			var ds = require('datastructures-js');
			var Twitter = require('twitter');
			var http = require('http');
			var client = new Twitter({
			  consumer_key: '7lqxbqzQHLoA9flVT6o2krPCi',
			  consumer_secret: 'vCBmlGpswlj2eIxGHvvpWmMRtpLhkvprt67M4PrOsywbRiNgIH',
			  access_token_key: '1917957684-EuFf4tPxzhcqvdaqCbIsYUdoEh9yCxUvmhH8iWV',
			  access_token_secret: '3M5kQubsrW1rClzF5xKlqBDl3YzTOuwwOkcLqmo17caVn'
			});

			var userdict = [];
			var params = {screen_name: this.state.ownerName};
			  client.get('statuses/user_timeline', params, function(error, tweets, response) {
			    if (!error) {
			      for(var tweet in tweets){

			        // Setup information
			        var natural_language_understanding = new NaturalLanguageUnderstandingV1({
			          'username': 'a42c5a4a-2534-4d4b-ac4f-c8dd2082dfd8',
			          'password': 'rYOeEclHS8FP',
			          'version_date': '2017-02-27'
			        });
			        // Text to analyze
			        var extractedText = tweets[tweet].text;
			        // Requested response data
			        var parameters = {
			          'text': extractedText,
			          'features': {
			            'keywords': {
			              'limit': 8
			            },
			            'categories': {}
			          },
			          'language': 'en'
			        };
			        // weighting formula = (number of times appears * relevance score) / total number of categories
			        // Run the analysis
			        natural_language_understanding.analyze(parameters, function(err, response) {
			          if (err)
			            console.log('error:', err);
			          else {
			            //console.log(JSON.stringify(response, null, 2));
			            var jsonObj = JSON.parse(JSON.stringify(response));
			            parseResponse(jsonObj);
			          }
			        });
			        // parse the results of the analysis
			        function parseResponse(jsonObj) {
			          var categoryList = [];
			          var keywordList = [];
			          var keywords = jsonObj['keywords'];
			          var categories = jsonObj['categories'];
			          // parse all keywords and store their relevance
			          for (var index = 0; index < keywords.length; index++) {
			            var word = keywords[index]['text'];
			            var relevance = keywords[index]['relevance'];
			            keywordList.push(word);
			          }
			          // get most specific category
			          for (var index = 0; index < categories.length; index++) {
			            var score = categories[index]['score'];
			            var label = categories[index]['label'];
			            var allLabels = label.split('/');
			            var count = 0
			            allLabels.forEach(function(entry) {
			              if (entry != '') {
			                var multiplier = .9 + (.3*count/allLabels.length);
			                categoryList[entry] = score*multiplier;
			                count+=1
			              }
			            });
			          }
			          for(var item in categoryList){
			            if(userdict[item] != undefined){
			              userdict[item] += categoryList[item]
			            }
			            else{
			              userdict[item] = categoryList[item]
			            }
			          }
			          //here we start to go through the items in categoryList
			          var items = Object.keys(userdict).map(function(key) {
			              return [key, userdict[key]];
			          });

			          // Sort the array based on the second element
			          items.sort(function(first, second) {
			              return second[1] - first[1];
			          });

			          for(var item in items){
			            console.log(item +' '+ items[item])
			          }
			          console.log('***************\n***************')
			        }
			      }
			    }
			  });
		};
	}
	render() {
		return (
			<form className="container" onSubmit={this.handleFormSubmit}>
				<h5></h5>
				<SingleInput
					inputType={'text'}
					title={'Enter Your Twitter Handle'}
					name={'name'}
					controlFunc={this.handleFullNameChange}
					content={this.state.ownerName}
					placeholder={'@example'} />
				<input
					type="submit"
					className="btn btn-primary float-right"
					value="Submit"/>
				<button
					className="btn btn-link float-left"
					onClick={this.handleClearForm}>Clear form</button>
			</form>
		);
	}
}

export default FormContainer;
