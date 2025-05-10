"use client";

import { ActionButtonList } from "@/components/ActionButtonList";
import { ConnectButton } from "@/components/ConnectButton";
import Image from "next/image";

interface PageProps {
  params: {
    amount: string;
  };
}

const DepositPage = ({ params }: PageProps) => {
  const amount = params.amount;

  // Convert to number and validate
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
};

export default DepositPage;
