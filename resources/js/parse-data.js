const {struct} = require ('./pb-utils.js');

const parseData  = (data) => {

	const jsonToStruct = (json) => {
		let data;
		try {
			const parseData = JSON.parse(json.replace(/(:\s*\[?\s*-?\d*)\.0/g, "$1.1"));
			data = struct.encode(parseData);
		} catch (e) {
			console.log(e)
			return {
				result: e.message
			};
		}
		return {
			result: data
		}

	}

	const structToJson = (structData) => {
		let data;
		try {
			const parseData = JSON.parse(structData.replace(/(:\s*\[?\s*-?\d*)\.0/g, "$1.1"));
			data = struct.decode(parseData)
		} catch (e) {
			console.log(e)
			return {
				result: e.message
			};
		}
		return {
			result: data
		}

	}
	const structIndicator = "fields";
	if (data.indexOf(structIndicator) === -1) {
		return structToJson(data);
	} else {
		return jsonToStruct(data);
	}
}

module.exports = parseData
