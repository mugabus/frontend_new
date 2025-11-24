import React from "react";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Welcome to MetaMask SIWE App</h1>
      <p>
        <a href="/login" style={{ color: "blue", textDecoration: "underline" }}>
          Go to Login
        </a>
      </p>
    </main>
  );
}
