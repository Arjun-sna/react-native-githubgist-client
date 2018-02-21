export const createActionSet = actionName => ({
	PENDING: `${actionName}_PENDING`,
	SUCCESS: `${actionName}_SUCCESS`,
	ERROR: `${actionName}_ERROR`,
});

export function createSagaActionSet(actionName) {
	return new Action(actionName);
}

function Action(actionName) {
	this.actionType = `DO_${actionName}`;
	this.progressType = `${actionName}_PROGRESS`;
	this.errorType = `${actionName}_ERROR`;
	this.successType = `${actionName}_SUCCESS`;
}

Action.prototype.action = function (payload) {
	return {
		type: this.actionType,
		payload,
	}
};
Action.prototype.progress = function () {
	return {
		type: this.progressType,
	}
};
Action.prototype.error = function (error) {
	return {
		type: this.errorType,
		error,
	}
};
Action.prototype.success = function (payload) {
	return {
		type: this.successType,
		payload,
	}
};

export const createReducer = (reducerMap, defaultState) =>
	(state = { ...defaultState }, action) =>
		reducerMap.hasOwnProperty(action.type) ? reducerMap[action.type](state, action) : state;

