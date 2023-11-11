import { client, usercontract, userdbaddress } from "./config";
import Web3Modal from 'web3modal';
import { ethers } from "ethers";

import USERABI from './userdb.json';

export async function convertWeiToEth(tokenbalance) {
    const output = ethers.utils.formatEther(tokenbalance);
    return output;
}


export const pinJSONToIPFS = async(data) => {
    const added = await client.add(data)
    const path = added.path; // wait for the cid and send to the smart contract
    return path;
}



export const postJSONToIPFS = async(post) => {
    const added = await client.add(post)
    const path = added.path; // wait for the cid and send to the smart contract
    return path;
}


export async function ethConnect() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect() // opens the wallet to connect metamask
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const userctr = new ethers.Contract(userdbaddress, USERABI, signer); // user database
    const addressraw = signer.getAddress(); // hex value of the address
    const addressstr = (await addressraw).valueOf(); // convert to string
    return {addressstr, userctr};
}





export async function addAccount(newcid) {
    const userdata = await ethConnect();
    const userctr = userdata.userctr; // data contract
    const addresstr = userdata.addressstr; // user address
    const confirmAccount = await userctr.confirmUser(); // check if an account exist
    if(confirmAccount == '0x0000000000000000000000000000000000000000'){
        const userentry = await usercontract.createProfile(newcid, addresstr, addresstr);
        const receipt = await userentry.wait();
        if(receipt) {
            return "complete";
        } else {
            return 'not successful';
        }}
        else {
            const updateuser = await userctr.updateProfile(newcid, addresstr);
            const receipt = await updateuser.wait();
            if (receipt) {
                return "complete";
            } else {
                return "not successful";
            }
        }
}







export async function signInUser(){
    const walletdata = await ethConnect();
    const walletaddr = walletdata.addressstr;
    return { walletaddr};
}

export async function changePic(file) {
    const added = await client.add(file)
    const piccid = added.path;
    return piccid;
}

export async function addPicture(piccid) {
    const userwallet = await ethConnect()
    const walletaddr = userwallet.addressstr;
    const sendPicCid = await usercontract.updatePicture(piccid, walletaddr);
    const receipt = await sendPicCid.wait();
    if (receipt) {
        return 'Complete';
    }
}

export async function getAccount() {
    const userdata = await ethConnect();
    const userctr = userdata.userctr;
    const userwallet = userdata.addressstr;
    const usercid = await userctr._account(userwallet);
    console.log(usercid);
    if(usercid[1] == '0x0000000000000000000000000000000000000000'){
        return 'no user'; // check if this is a new account 
        // populate with new user info
    }
    else {
        const userurl = 'http://127.0.0.1:8080/ipfs/' + usercid[0];
        const piccid = await userctr._picture(userwallet);
        const picurl = 'http://127.0.0.1:8080/ipfs/' + piccid;
        const paywallet = usercid[2];
        const wallet = usercid[1];
        
        
        return {userurl, picurl, wallet, paywallet};
    }
}



