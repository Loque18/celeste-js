import {
    // REQUEST_CONNECTION,
    SET_CHAIN_ID,
    SET_RROVIDER_WALLET,
    SET_ADDRESS,
    SET_LOGIN_STATUS,
} from '../constants';

export const set_chain_id = id => ({ type: SET_CHAIN_ID, payload: id });
export const set_provider_wallet = wallet => ({
    type: SET_RROVIDER_WALLET,
    payload: wallet,
});
export const set_address = address => ({
    type: SET_ADDRESS,
    payload: address,
});
export const set_login_status = status => ({
    type: SET_LOGIN_STATUS,
    payload: status,
});

// /*  *~~*~~*~~*~~*~~* THUNK FUNCTIONS *~~*~~*~~*~~*~~* */

// export const request_connection = () => {
//     return async (dispatch, getState) => {
//         const { ethereum } = window;
//         const { web3 } = getState().web3Reducer;

//         try {
//             const accounts = await ethereum.request({
//                 method: 'eth_requestAccounts',
//             });
//             dispatch(set_login_status(true));
//             dispatch(set_chain_id(await web3.eth.getChainId()));
//             dispatch(set_address(accounts[0]));
//         } catch (e) {
//             // throw e;
//         }
//     };
// };

// export const request_disconnection = () => {
//     return async dispatch => {
//         dispatch(set_login_status(false));
//         dispatch(set_wallet(null));
//         dispatch(set_address(null));
//     };
// };

// export const request_change_network = networkId => {
//     return async () => {
//         try {
//             await window.ethereum.request({
//                 method: 'wallet_switchEthereumChain',
//                 params: [{ chainId: `0x${networkId.toString(16)}` }], // chainId must be in hexadecimal numbers
//             });
//         } catch (e) {
//             // alert(e);
//             // console.log("ERROR REQUESTING CHANGE NETWORK", e);
//         }
//     };
// };
