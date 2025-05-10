"use client";

import { useParams } from "next/navigation";
import { ActionButtonList } from "@/components/ActionButtonList";
import { ConnectButton } from "@/components/ConnectButton";
import Image from "next/image";

export default function DepositPage() {
  const params = useParams();
  const amount = params.amount as string | undefined;

  if (!amount) {
    return <h1>Oops! Amount is missing.</h1>;
  }

  const parsedAmount = parseFloat(amount);
  const isValid = !isNaN(parsedAmount) && parsedAmount > 0;

  if (!isValid) {
    return <h1>Oops! Invalid amount specified.</h1>;
  }

  return (
    <div className="trx-container">
      <Image
        src="/test_logo1.png"
        alt="Reown"
        width={150}
        height={150}
        priority
      />
      <h1>Stake {parsedAmount}</h1>
      <p>Amount: {parsedAmount}</p>
      <ConnectButton />
      <ActionButtonList amount={amount} />
    </div>
  );
}
