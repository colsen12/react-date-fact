import React from 'react'

export default function Fact({ year, text, month, date, loading }) {
	return (
		<div className="factContent">
			<h3>Fact of the Day</h3>
			<p>{loading || !month || !date || date > 31 || date < 1 || month > 12 || month < 1 ? "" : 
			`On this day in the year ${year}: ${text}.`}</p>
		</div>
	)
}