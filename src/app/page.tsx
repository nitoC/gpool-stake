import { ConnectButton } from "@/components/ConnectButton";
// import { InfoList } from "@/components/InfoList";
// import { ActionButtonList } from "@/components/ActionButtonList";
import Image from "next/image";

export default function Home() {
  return (
    <div className={"pages"}>
      <Image
        src="/test_logo1.png"
        alt="Reown"
        width={150}
        height={150}
        priority
      />

      <ConnectButton />
      {/* <ActionButtonList /> */}
      <div className="advice">
        <p>
          <a
            href="https://gpoolnetwork.com"
            target="_blank"
            className="link-button"
            rel="Reown Cloud"
          >
            Gpool Network
          </a>{" "}
        </p>
      </div>
    </div>
  );
}
