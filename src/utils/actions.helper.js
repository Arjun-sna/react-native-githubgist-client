export const createActionSet = actionName => ({
	PENDING: `${actionName}_PENDING`,
	SUCCESS: `${actionName}_SUCCESS`,
	ERROR: `${actionName}_ERROR`,
});

export const createSagaActionSet = actionName => ({
	action: (payload) => ({
		type: `DO_${actionName}`,
		payload,
	}),
	progress: `${actionName}_progress`,
	error: (error) => ({
		type: `${actionName}_ERROR`,
		error,
	}),
	success: (payload) => ({
		type: `${actionName}_SUCCESS`,
		payload,
	}),
});
