import axios from 'axios';

export const CLIENT_ID = '';
export const CLIENT_SECRET = '';

const METHOD = {
	GET: 'GET',
	HEAD: 'HEAD',
	PUT: 'PUT',
	DELETE: 'DELETE',
	PATCH: 'PATCH',
	POST: 'POST',
};

export const v3 = {
	root: 'https://api.github.com',
	call: async (url, parameters) => {
		const finalUrl = url.indexOf(v3.root) === 0 ? url : `${v3.root}${url}`;
		const response = await axios(url, parameters);

		return response;
	},
	parameters: (
		accessToken,
		method = Method.GET,
		accept = 'application/vnd.github.v3+json',
		data = {}
	) => {
		const withBody = [METHOD.PUT, METHOD.POST, METHOD.PATCH];
		const params = {
			method,
			headers: {
				Accept: accept,
				Authorization: `token ${accessToken}`,
				'Cache-Control': 'no-cache',
			},
		};

		if (withBody.indexOf(method) !== -1) {
			params.data = JSON.stringify(data);
			if (method === METHOD.PUT) {
        params.headers['Content-Length'] = 0;
      }
		}

		return params;
	}
}