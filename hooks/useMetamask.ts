"use client"; 
import { getNonce, verifySignature } from "@/lib/api";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function useMetamask() {
  async function connect() {
    if (!window.ethereum) {
      throw new Error("MetaMask not detected. Please install it first.");
    }

    const accounts: string[] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = accounts[0];

    const { nonce } = await getNonce();

    const domain = window.location.host;
    const message = `${domain} wants you to sign in with your Ethereum account: ${address}\nNonce: ${nonce}`;

    const signature = await window.ethereum.request({
      method: "personal_sign",
      params: [message, address],
    });

    const res = await verifySignature(message, signature);
    return res;
  }

  return { connect };
}
