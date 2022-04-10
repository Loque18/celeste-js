import {
	SET_WEB3_INSTANCE,
	SET_WEB3_READ_INSTANCE,
	ADD_CONTRACT,
	SET_INITIALIZED,
} from "../constants";

const defaultState = {
	web3: {},
	web3read: {},
	initialized: false,
	contracts: [],
};

// eslint-disable-next-line default-param-last
const reducer = (state = defaultState, { type, payload }) => {
	switch (type) {
		case SET_WEB3_INSTANCE:
			return {
				...state,
				web3: payload,
			};

		case SET_WEB3_READ_INSTANCE:
			return {
				...state,
				web3read: {
					[payload.chainId]: payload.web3instance,
					[payload.chainName]: payload.web3instance,
				},
			};

		case ADD_CONTRACT: {
			const { contracts } = { ...state };
			contracts[payload.key] = payload.contract;

			return {
				...state,
				contracts,
			};
		}

		case SET_INITIALIZED:
			return {
				...state,
				initialized: payload,
			};

		default:
			return { ...state };
	}
};

export default reducer;
