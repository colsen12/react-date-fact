import React, { useState, useEffect } from 'react';
import Fact from './components/Fact';
import './App.css';

function App() {

const [month, setMonth] = useState("")
const [date, setDate] = useState("")
const [text, setText] = useState("")
const [year, setYear] = useState("")
const [loading, setLoading] = useState(false);

useEffect(() => {
	if(!date || !month) {
		return undefined;
	}
	else if (date > 31 || date < 1 || month > 12 || month < 1){
		return alert("Please enter valid month and date.");
	}
		else {
		setLoading(true);
		async function fetchMyApi() { 
			const response = 
			await fetch(`https://numbersapi.p.rapidapi.com/${month}/${date}/date?fragment=true&json=true`, {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "numbersapi.p.rapidapi.com",
				"x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`
			}
		});
		const data = await response.json();
		const text = data.text;
		const year = data.year;
		setText(text);
		setYear(year);
		setLoading(false);
		}
	
		fetchMyApi()
	}
}, [date, month]);

 const updateMonth = e => {
   setMonth(e.target.value);
  };

 const updateDate = e => {
  setDate(e.target.value);
  };

  return (
  	<React.Fragment>
  	<h3 className="header">Enter a numeric date and month below, and find 
  	out what happened on that day in history</h3>
    <div className="container">
      <form>
      	<input 
      	className="monthBox" 
      	type="number" 
      	min="1" 
      	max="12" 
      	value={month} 
      	onChange={updateMonth}
      	placeholder="M" />/
      	<input 
      	className="dateBox" 
      	type="number" 
      	min="1" max="31" 
      	value={date} 
      	onChange={updateDate}
      	placeholder="D" />
      </form>
     </div>
     <div className="result">
     <p className="loading">{loading ? "Fetching your fact..." : ""}</p>
     	<Fact
     	loading={loading}
     	 month={month}
     	 date={date}
     	 year={year}
     	 text={text}/> 
     </div>
     </React.Fragment>
  );
}

export default App;
