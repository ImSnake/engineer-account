const token = "5559724156bc8610c560a9f9660939d1a8aac5cf";

export default {

	getFmsUnits(unit) {
		const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fms_unit";
		const options = {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Authorization": "Token " + token
			},
			body: JSON.stringify({query: unit})
		}

		return fetch(url, options)
			.then(response => response.text())
			.then(result => JSON.parse(result))
			.catch(error => console.log("error", error));
	},

	getCleanAddress(unit) {
		const url = "https://cleaner.dadata.ru/api/v1/clean/address";
		const secret = "578af280f542aa1ffc4364bbdc8aee528618494a";

		const options = {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Token " + token,
				"X-Secret": secret
			},
			body: JSON.stringify([unit])
		}

		console.log(options);

		fetch(url, options)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log("error", error));
	}


}

