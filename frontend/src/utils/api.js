const api = async (path, body) => {
	let URL = import.meta.env.PROD ? "https://ecell.iitm.ac.in/data" : "http://localhost:5100";
	console.debug(body);
	const res = await fetch(`${URL}${path}`, {
		credentials: "include",
		method: body ? "POST" : "GET",
		body: body ? JSON.stringify(body) : undefined,
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await res.json();
	if (!res.ok) {
		const err = new Error(data.message);
		throw err;
	}
	return data;
};

export default api;
