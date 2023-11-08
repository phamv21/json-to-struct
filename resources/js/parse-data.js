const {struct} = require ('./pb-utils');

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

	const structToJson = (struct) => {
		let data;
		try {
			const parseData = JSON.parse(json.replace(/(:\s*\[?\s*-?\d*)\.0/g, "$1.1"));
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

if (typeof module != 'undefined') {
	if (!module.parent) {
		if (process.argv.length > 2 && process.argv[2] === '-big') {
			bufs = []
			process.stdin.on('data', function(buf) {
				bufs.push(buf)
			})
			process.stdin.on('end', function() {
				const json = Buffer.concat(bufs).toString('utf8')
				console.log(parseData(json))
			})
		} else {
			process.stdin.on('data', function(buf) {
				const json = buf.toString('utf8')
				console.log(parseData(json))
			})
		}
	} else {
		module.exports = parseData
	}
}