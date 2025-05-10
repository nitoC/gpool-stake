"use client";

import {
  useDisconnect,
  useAppKit,
  useAppKitNetwork,
  // useAppKitAccount,
} from "@reown/appkit/react";
import { useAccount, useWriteContract } from "wagmi";
import { parseUnits } from "viem";
import { erc20Abi } from "viem";
// import { networks } from "@/config";
import { useState } from "react";
import { Modal } from "./Modal";

export const ActionButtonList = ({ amount }: { amount: string }) => {
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();
  // const { address: reownAddress, isConnected } = useAppKitAccount();
  const { caipNetwork } = useAppKitNetwork();
  const [modal, setModal] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);

  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const BASE_USDT = "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2";
  const ARBITRUM_USDT = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";

  const recipient = "0x72222dF7093CF9c1E9F53Ee3b380D6bc1c56B9d3"; // Replace with real recipient

  const handleSendUSDT = async () => {
    if (!address) {
      console.error("Wallet not connected");
      setModal({ type: "error", message: "Wallet not connected" });
      return;
    }

    const networkName = caipNetwork?.name?.toLowerCase();
    const tokenAddress =
      networkName === "base"
        ? BASE_USDT
        : networkName === "arbitrum one"
        ? ARBITRUM_USDT
        : null;

    if (!tokenAddress) {
      console.error("Unsupported network for USDT transfer");
      setModal({ type: "error", message: "Unsupported network" });
      return;
    }

    try {
      const txHash = await writeContractAsync({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "transfer",
        args: [recipient, parseUnits(amount, 6)],
      });

      setModal({ type: "success", message: "Transaction sent successfully!" });
      await fetch("/api/stake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: address,
          amount,
          txHash,
          network: networkName,
        }),
      });
      console.log("Transaction sent! Hash:", txHash);
    } catch (err) {
      console.error("USDT transfer failed:", err);
      setModal({ type: "error", message: err.message || "Transfer failed" });
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };

  return (
    <>
      <div className="btn-list">
        <button onClick={() => open()}>Open Wallet</button>
        <button onClick={handleDisconnect}>Disconnect</button>
        <button onClick={handleSendUSDT}>Stake {amount} USDT</button>
      </div>
      {modal && (
        <Modal
          type={modal.type}
          message={modal.message}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
};
