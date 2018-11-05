
var personOriginal = {
	"id": 1,
	"name": "Leanne Graham",
	"username": "Bret",
	"email": "Sincere@april.biz",
	"address": {
		"street": "Kulas Light",
		"suite": "Apt. 556",
		"city": "Gwenborough",
		"zipcode": "92998-3874",
		"geo": {
			"lat": "-37.3159",
			"lng": "81.1496"
		}
	},
	"phone": "1-770-736-8031 x56442",
	"website": "hildegard.org",
	"company": {
		"name": "Romaguera-Crona",
		"catchPhrase": "Multi-layered client-server neural-net",
		"bs": "harness real-time e-markets"
	}
}

function deepCopyObj(obj) 
{ 
	if (null == obj || "object" != typeof obj) 
		return obj; 
	if (obj instanceof Date) { 
		var copy = new Date(); 
		copy.setTime(obj.getTime()); 
		return copy; 
	}

	if (obj instanceof Array) { 
		var copy = []; 
		for (var i = 0, len = obj.length; i < len; i++) { 
			copy[i] = deepCopyObj(obj[i]); 
		} 
	return copy; 
	}

	if (obj instanceof Object) 
	{ 
		var copy = {}; 
		for (var attr in obj) { 
			if (obj.hasOwnProperty(attr)) copy[attr] = deepCopyObj(obj[attr]); 
		} 
	return copy; 
	} 
	throw new Error("Unable to copy this object."); 
}

var personOriginalCopy = deepCopyObj(personOriginal);

personOriginal.address.geo.lat = "-47.3159";
console.log(personOriginalCopy.address.geo.lat);
