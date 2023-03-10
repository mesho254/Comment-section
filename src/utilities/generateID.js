function generateID(object) {
	const usedID = [];
	for (let obj of object) {
		usedID.push(obj.id);
		for (let rep of obj.replies) {
			usedID.push(rep.id);
		}
	}
	let result;
	do {
		result = Math.floor(Math.random() * 1000);
	} while (usedID.includes(result));
	return result;
}

export default generateID;
