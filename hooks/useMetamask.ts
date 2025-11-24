"use client";

import { SiweMessage } from "siwe";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function useMetamask() {
  async function connect() {
    if (!window.ethereum) throw new Error("MetaMask not detected.");

    const accounts: string[] = await window.ethereum.request({ method: "eth_requestAccounts" });
    const address = accounts[0];

    // Fetch nonce from backend
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/nonce`);
    const { nonce } = await res.json();

    // Create proper SIWE message
    const message = new SiweMessage({
      domain: window.location.host,
      address,
      statement: "Sign in to MetaMask App",
      uri: window.location.origin,
      version: "1",
      chainId: 1,
      nonce,
    });

    // Request signature
    const signature = await window.ethereum.request({
      method: "personal_sign",
      params: [message.prepareMessage(), address],
    });

    // Send to backend
    const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message.prepareMessage(), signature }),
    });

    return verifyRes.json();
  }

  return { connect };
}
