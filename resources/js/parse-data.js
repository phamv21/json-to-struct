const parseData  = (input) => {

	const jsonToStruct = (json) => {
		let data;
		try {
			window.stvp = json
			const parseData = (JSON.parse(json));
			data = exports.struct.encode(parseData);
			console.log('BEEPJS',json)
			console.log('BEEPJS',data)
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
			console.log('BEEPSJ',structData)
			console.log('BEEPSJ',data)
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
	if (JSON.stringify(input).indexOf(structIndicator) !== -1) {
		return structToJson(input);
	} else {
		return jsonToStruct(input);
	}
}
