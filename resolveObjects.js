module.exports = (obj) => {
	result = {};
	for (const cle in obj) {
		if (!cle.includes(".")) {
			result[cle] = obj[cle];
            continue
		}
		const path = cle.split(".");
        let currentObj = obj;
        while(path.length){
            const currentKey = path.shift();
            if(!currentObj[currentKey]){
                currentObj[currentKey] = obj[cle];
                break;
            }
            if(currentObj[currentKey]){
                currentObj = currentObj[currentKey];
            }
        }
	}
	return result;
};