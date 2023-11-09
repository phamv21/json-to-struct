const parseData  = (input) => {

	const jsonToStruct = (json) => {
		let data;
		try {
			let parseData;
			if (typeof json === 'string') {
				parseData = (JSON.parse(json));
			} else{
				parseData = json;
			}
			return exports.struct.encode(parseData);
		} catch (e) {
			console.log(e)
			return {
				result: e.message
			};
		}
	}

	const structToJson = (structData) => {
		let data;
		try {
			let parseData;
			if (typeof structData === 'string') {
				parseData = (JSON.parse(structData));
			} else{
				parseData = structData;
			}
			// const parseData = JSON.parse(structData.replace(/(:\s*\[?\s*-?\d*)\.0/g, "$1.1"));
			return exports.struct.decode(parseData)
		} catch (e) {
			console.log(e)
			return {
				result: e.message
			};
		}
	}
	const isStruct = (value) =>{
		const structIndicator = /(stringValue|numberValue|nullValue)/;
		return JSON.stringify(value).match(structIndicator) !== null
	}
	const jsonObject = JSON.parse(input);
	let result = {};
	Object.keys(jsonObject).forEach((key)=> {
		if (typeof jsonObject[key] === 'object' && key !== 'fields'){
			if(isStruct(jsonObject[key])){
				result[key] = structToJson(jsonObject[key]);
			} else {
				result[key] = jsonToStruct(jsonObject[key]);
			}
		}else if((typeof jsonObject[key] === 'object' && key === 'fields')){
			return structToJson(jsonObject)
		} else {
			result[key] = jsonObject[key];
		}
	})
	return {result};


}
