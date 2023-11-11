import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import userDbAbi from './userdb.json';

export const client = ipfsHttpClient('http://127.0.0.1:5001');
export const userdbaddress = '0x05F0271396fB2F6d29c10135606A46AD3e6939df';
export const rpc = 'https://endpoints.omniatech.io/v1/eth/sepolia/public';
const updaterwallet = '2fc5e6304ef5bfb1997f8357ff77afb6e542c94331dcc956bd25187944e721b8';
const provider = new ethers.providers.JsonRpcProvider(rpc);
export const updater = new ethers.Wallet(updaterwallet, provider);
export const usercontract = new ethers.Contract(userdbaddress, userDbAbi, updater);

