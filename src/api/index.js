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

const ACCEPT = {
	DIFF: 'application/vnd.github.v3.diff+json',
	FULL: 'application/vnd.github.v3.full+json',
	HTML: 'application/vnd.github.v3.html+json',
	JSON: 'application/vnd.github.v3+json',
	MERCY_PREVIEW: 'application/vnd.github.mercy-preview+json',
	RAW: 'application/vnd.github.v3.raw+json',
};

export const v3 = {
	root: 'https://api.github.com',
	call: async(url, parameters) => {
		const finalUrl = url.indexOf('https://') === 0 ? url : `${v3.root}${url}`;
		const response = await axios(finalUrl, parameters);

		return response;
	},
	parameters: (
		accessToken,
		method = METHOD.GET,
		accept = ACCEPT.JSON,
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
	getJson: async(url, accessToken) => {
		const response = await v3.call(url, v3.parameters(accessToken));

		return response.data;
	},
	getJsonWithHeader: async(url, accessToken) => {
		const response = await v3.call(url, v3.parameters(accessToken));
		const { headers, data } = response;

		return { headers, data };
	},
	getRaw: async(url, accessToken) => {
		const response = await v3.call(url, v3.parameters(accessToken, METHOD.GET, ACCEPT.RAW));

		return response.data;
	},
	getDataFromPostRequest: async(url, accessToken, body) => {
		const response = await v3.call(url, v3.parameters(accessToken, METHOD.POST, ACCEPT.JSON, body));

		return response.data;
	},
	getDataFromPutRequest: async(url, accessToken) => {
		const response = await v3.call(url, v3.parameters(accessToken, METHOD.PUT, ACCEPT.JSON));

		return response.status;
	},
	performDeleteRequest: async(url, accessToken) => {
		const response = await v3.call(url, v3.parameters(accessToken, METHOD.DELETE));

		return response.status;
	},
};

export const fetchAccessToken = async({ code, state }) => {
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
};

export const requestAddComment = async(accessToken, id, payload) =>
	v3.getDataFromPostRequest(`/gists/${id}/comments`, accessToken, { body: payload });

export const getAuthUser = async accessToken => await v3.getJson('/user', accessToken);

export const requestUserGists = async(accessToken, userName, pageNo) => await v3.getJsonWithHeader(`/users/${userName}/gists?page=${pageNo}`, accessToken);

export const requestStarredGists = async(accessToken, pageNo) => await v3.getJsonWithHeader(`/gists/starred?page=${pageNo}`, accessToken);

export const requestPublicGists = async(accessToken, pageNo) => await v3.getJsonWithHeader(`/gists/public?page=${pageNo}`, accessToken);

export const fetchFileContent = async(accessToken, fileContentUrl) => await v3.getRaw(fileContentUrl, accessToken);

export const requestGistComments = async(accessToken, gistId) => await v3.getJsonWithHeader(`/gists/${gistId}/comments`, accessToken);

export const requestStarGist = async(accessToken, gistId) => v3.getDataFromPutRequest(`/gists/${gistId}/star`, accessToken);

export const checkStarredGistFavoriteValue = async(accessToken, gistId) => v3.getJson(`/gists/${gistId}/star`, accessToken);

export const requestUnstarGist = async(accessToken, gistId) => v3.performDeleteRequest(`/gists/${gistId}/star`, accessToken);

export const requestDeleteComment = async(accessToken, gistId, commentId) => v3.performDeleteRequest(`/gists/${gistId}/comments/${commentId}`, accessToken);
