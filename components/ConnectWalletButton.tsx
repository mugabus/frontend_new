"use client";

import React, { useState } from "react";
import { useMetamask } from "@/hooks/useMetamask";

export default function ConnectWalletButton() {
  const { connect } = useMetamask();
  const [addr, setAddr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleConnect() {
    setLoading(true);
    setErr(null);
    try {
      const res = await connect();
      if (res?.address) setAddr(res.address);
      else if (res?.error) setErr(res.error);
      else setErr("Unexpected response");
    } catch (e: any) {
      setErr(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleConnect}
        style={{ padding: 10, borderRadius: 8, cursor: "pointer" }}
      >
        {loading ? "Connecting…" : addr ? `Connected: ${addr}` : "Connect MetaMask"}
      </button>
      {err && <div style={{ color: "red", marginTop: 8 }}>{err}</div>}
    </div>
  );
}
