/**
 * copy object properties of the object passed as parameter and resolve any path key (eg: 'a.b.c.d')
 * to retur 
 * @param {Object} obj 
 * @returns 
 */
const resolveObjects = (obj) => {
	const result = {};
    const [pathKeys, regularKeys] = Object.keys(obj).reduce(([path, regular], key) => {
        if(key.includes('.')){
            path.push(key);
        }else {
            regular.push(key)
        }
        return [path, regular]
    },[[], []]);


    regularKeys.forEach((key) => {
        if(obj[key] !== null && typeof obj[key]  === "object"){
            result[key] = resolveObjects(obj[key]);
        } else {
            result[key] = obj[key];
        }
    })

    pathKeys.forEach((key) => {
        const path = key.split(".");
        let currentObj = result;
        while(true){
            const currentKey = path.shift();
            if(!path.length){
                currentObj[currentKey] = obj[key];
                break;
            }
            if(currentObj[currentKey]){
                currentObj = currentObj[currentKey];
            } else {
                currentObj[currentKey] = {}
                currentObj = currentObj[currentKey];
            }
        }
    })
	return result;
};

module.exports = resolveObjects