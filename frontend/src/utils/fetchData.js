const fetchData = async (path, token, body) => {
	let URL = import.meta.env.PROD ? "https://ecell.iitm.ac.in/data" : "http://localhost:5100";
	console.debug(body);
	const res = await fetch(`${URL}${path}`, {
		credentials: "include",
		method: body ? "POST" : "GET",
		body: body ? JSON.stringify(body) : undefined,
		headers: {
			"Content-Type": "application/json",
			Authorization: token && "Bearer " + token,
		},
	});
	return res.json();
};

export default fetchData;
