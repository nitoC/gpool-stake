"use client";

import { ActionButtonList } from "@/components/ActionButtonList";
import { ConnectButton } from "@/components/ConnectButton";
import Image from "next/image";

interface DepositPageProps {
  params: { amount: string };
}

const DepositPage = ({ params }: DepositPageProps) => {
  const amount = params.amount;

  // Validate amount — `parseInt` returns NaN for invalid input, which is a number
  if (isNaN(parseInt(amount))) {
    return <h1>Oops! Something went wrong</h1>;
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
      <h1>Stake {amount}</h1>
      <p>Amount: {amount}</p>
      <ConnectButton />
      <ActionButtonList amount={amount} />
    </div>
  );
};

export default DepositPage;
