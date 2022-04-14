/* eslint-disable no-undef */
import Web3 from 'web3';

import { store as celesteStore, actions } from '@celeste-js/store';

const {
    set_web3_instance,
    set_web3_read_instance,
    set_wallet,
    set_login_status,
    set_address,
    set_chain_id,
} = actions;

// import WalletConnect from '@walletconnect/client';
// import QRCodeModal from '@walletconnect/qrcode-modal';

// Create a connector
// const connector = new WalletConnect({
//     bridge: "https://bridge.walletconnect.org", // Required
//     qrcodeModal: QRCodeModal,
// });

const initWeb3 = async () => {
    /* injected */

    // 1. get ethereum
    const { ethereum } = window;

    if (!ethereum) {
        return;
    }

    // 2. set wallet provider
    if (ethereum.isMetaMask) celesteStore.dispatch(set_wallet('metamask'));
    if (ethereum.isTrust) celesteStore.dispatch(set_wallet('trust wallet'));

    // 3. instantiate web3
    const web3 = await new Web3(ethereum);
    celesteStore.dispatch(set_web3_instance(web3));

    // 4. detect if wallet is connected to site
    const accArray = await web3.eth.getAccounts();
    if (accArray.length === 0) store.dispatch(set_login_status(false));
    else {
        store.dispatch(set_login_status(true));
        store.dispatch(set_address(accArray[0]));
        store.dispatch(set_chain_id(await web3.eth.getChainId()));
    }

    // 5. listen to eth change events
    ethereum.on('accountsChanged', accounts => {
        if (accounts.length > 0) {
            store.dispatch(set_address(accounts[0]));
        } else {
            store.dispatch(set_login_status(false));
            store.dispatch(set_address(null));
        }
    });

    // ethereum.on('connect', connectInfo => {

    //     // if(accounts[0] != null)
    //     //     store.dispatch( set_address(accounts[0]) );

    //     // store.dispatch( set_connection(true) );
    //     // console.log('cnx');
    // });

    // ethereum.on('disconnect', error => {
    //     // store.dispatch( set_address('') );
    //     // console.log(error);
    // });

    ethereum.on('chainChanged', async () => {
        // window.location.reload();
        store.dispatch(set_chain_id(await web3.eth.getChainId()));
    });

    /* connector */
};

const initStaticWeb3 = rpc => {
    // rpcs.forEach((rpc) => {
    // 	const { chainId, url } = rpc;
    // 	const web3 = new Web3(url);
    // 	store.dispatch(set_web3_read_instance(chainId, web3));
    // });

    const { chainId, chainName, url } = rpc;
    const web3 = new Web3(url);
    store.dispatch(set_web3_read_instance(chainName, chainId, web3));
};

export { initWeb3, initStaticWeb3 };
