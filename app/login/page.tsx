
import ConnectWalletButton from "@/components/ConnectWalletButton";

export default function LoginPage() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Login with MetaMask</h1>
      <ConnectWalletButton />
    </main>
  );
}
