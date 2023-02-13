import React from "react";
import { ConnectWallet, useSDK } from "@thirdweb-dev/react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { signInWithCustomToken } from "firebase/auth";
import initializeFirebaseClient from "../lib/initFirebase";
import { useStateContext } from "../context";
import { MediaRenderer } from "@thirdweb-dev/react";

const Auth = () => {
  const { address, login } = useStateContext();
  // const sdk = useSDK();
  // const { auth, db } = initializeFirebaseClient();

  return (
    <>
      <div className="w-[100%] flex flex-col justify-center mt-[60px] gap-[40px] items-center">
        <h2 className="font-epilogue font-semibold text-[24px] text-white uppercase text-center w-full">
          Connect your wallet
        </h2>
        {address ? (
          <button
            onClick={() => {
              // signIn()
            }}
          >
            Sign in with Ethereum
          </button>
        ) : (
          <div>
            <ConnectWallet />
            {/* <button onClick={login}>Login</button> */}
          </div>
        )}
        <div className=" w-[500px] h-[300px]">
          {/* this is just for fun */}
          <MediaRenderer
            src="ipfs://Qmb9ZV5yznE4C4YvyJe8DVFv1LSVkebdekY6HjLVaKmHZi"
            alt="A mp4 video"
          />
        </div>
      </div>
    </>
  );
};

export default Auth;
