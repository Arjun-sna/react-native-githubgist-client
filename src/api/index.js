import axios from 'axios';

export const CLIENT_ID = '9ad8569261681e200601';
export const CLIENT_SECRET = '3b825b8ab987cfce15404837ac3dc0abdbdae4cc';

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
		const response = await axios(finalUrl, parameters);
		
		return response;
	},
	parameters: (
		accessToken,
		method = METHOD.GET,
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
	},
	getJson: async (url, accessToken) => {
		const response = await v3.call(url, v3.parameters(accessToken));
		
		return response.data;
	},
	getJsonWithHeader: async (url, accessToken) => {
		const response = await v3.call(url, v3.parameters(accessToken));
		const { headers, data } = response;

		return { headers, data };
	},
}

export const fetchAccessToken = async ({ code, state }) => {
	const GITHUB_OAUTH_ENDPOINT = 'https://github.com/login/oauth/access_token';

	const response = await axios(GITHUB_OAUTH_ENDPOINT, {
		method: METHOD.POST,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		data: JSON.stringify({
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			code,
			state,
		}),
	});

	return response.data;
}

export const getAuthUser = async accessToken => await v3.getJson('/user', accessToken);

export const requestUserGists = async (accessToken, userName) => await v3.getJsonWithHeader(`/users/${userName}/gists`, accessToken)

export const requestStarredGists = async accessToken => await v3.getJsonWithHeader('/gists/starred', accessToken)

export const requestPublicGists = async accessToken => await v3.getJsonWithHeader('/gists/public', accessToken);