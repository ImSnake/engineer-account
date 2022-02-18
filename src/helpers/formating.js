export const DateDiff = {
	inHours: function(d1, d2) {
		const t2 = d2.getTime();
		const t1 = d1.getTime();

		return Math.round((t2-t1)/(3600*1000));
	},

	inDays: function(d1, d2) {
		const t2 = d2.getTime();
		const t1 = d1.getTime();

		return Math.round((t2-t1)/(24*3600*1000));
	},

	inWeeks: function(d1, d2) {
		const t2 = d2.getTime();
		const t1 = d1.getTime();

		return parseInt((t2-t1)/(24*3600*1000*7));
	},

	inMonths: function(d1, d2) {
		const d1Y = d1.getFullYear();
		const d2Y = d2.getFullYear();
		const d1M = d1.getMonth();
		const d2M = d2.getMonth();

		return (d2M+12*d2Y)-(d1M+12*d1Y);
	},

	inYears: function(d1, d2) {
		return d2.getFullYear()-d1.getFullYear();
	}
}

// Рассчитать разницу между переданными датами: вернет дни или часы (если разница меньше дня)
export const dateCalculateDifference = (dateFrom = '', dateTill = '') => {

	const returnData = {
		day: 0,
		hour: 0
	};

	if (!dateTill && !dateFrom) {
		returnData.day = 9999;
		returnData.title = 'cрок исполнения не задан';
	} else {
		const timeInDays  = DateDiff.inDays(dateFrom, dateTill);
		const timeInHours = DateDiff.inHours(dateFrom, dateTill);

		if (timeInDays === 0) {
			returnData.hour = Math.abs(timeInHours);

			if (timeInHours < 0) {
				returnData.hour *= -1;
			}

			returnData.title = getTimeTitle(returnData.hour, getWordEnding(returnData.hour, 'час', 'часа', 'часов'));
		} else {
			returnData.day = Math.abs(timeInDays);

			if (timeInDays < 0) {
				returnData.day *= -1;
			}

			returnData.title = getTimeTitle(returnData.day, getWordEnding(returnData.day, 'день', 'дня', 'дней'))
		}
	}

	returnData.summary = returnData.day + (returnData.hour * 0.01);

	return returnData;
}

export const getTimeTitle = (time, word) => {
	if (time < 0) {
		return `просрочено на ${time * -1} ${word}`;
	} else {
		return `осталось ${time} ${word}`;
	}
}

// Формат даты по шаблону : из 2021-01-01(T00:00:00) в 01.01.2021
export const dateFormatDdMmYyyy = (date) => {
	const format = /([0-9]{4})-([0-9]{2})-([0-9]{2})/;
	return date.substr(0, 10).replace(format, '$3.$2.$1');
}

// Формат даты по шаблону : из 2021-01-01(T00:00:00) в 01.01.2021
export const dateTimeFormatHHMM = (date) => {
	const dateSplit = date.split(" ");
	return dateSplit[1].substr(0, 5);
}

// валидация Даты
export const dateIsValid = (date)=> {
	return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
}

// Склонить окончание исчисляемого существительного в зависимости от переданного количества
export const getWordEnding = (count, one, two, five) => {
	const n = Math.abs(count) % 100;
	const n10 = n % 10;
	let result = "";
	(n >= 5 && n <= 20) ? result = five : (n10 > 1 && n10 < 5) ? result = two : (n10 === 1) ? result = one : result = five;
	return result
}

// Format a number with grouped thousands
export const numberFormat = (number, decimals, dec_point, thousands_sep) => {
	let i, j, kw, kd, km;

	// input sanitation & defaults
	if( isNaN(decimals = Math.abs(decimals)) ){
		decimals = 2;
	}
	if( dec_point == undefined ){
		dec_point = ",";
	}
	if( thousands_sep == undefined ){
		thousands_sep = ".";
	}

	i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

	if((j = i.length) > 3){
		j = j % 3;
	} else{
		j = 0;
	}

	km = (j ? i.substr(0, j) + thousands_sep : "");
	kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
	//kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
	kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");

	return km + kw + kd;

	// original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com) improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net) bugfix by: Michael White (http://crestidg.com)
}

// Конвертация строки в html формат
export const valueFormatToHtml = (value) => {
	return value.replace(/\n/gim, '<br/>');
}

