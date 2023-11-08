const parseData  = (input) => {

	const jsonToStruct = (json) => {
		let data;
		try {
			window.stvp = json
			const parseData = (JSON.parse(json));
			data = exports.struct.encode(parseData);
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
			// const parseData = JSON.parse(structData.replace(/(:\s*\[?\s*-?\d*)\.0/g, "$1.1"));
			data = exports.struct.decode(JSON.parse(structData))
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
	const structIndicator = /(stringValue|numberValue|nullValue)/;
	if (JSON.stringify(input).match(structIndicator) !== null) {
		return structToJson(input);
	} else {
		return jsonToStruct(input);
	}
}
