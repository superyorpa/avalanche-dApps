'use client';

import { useState, useEffect } from 'react';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useWriteContract,
  useChainId,
} from 'wagmi';

import { injected } from 'wagmi/connectors';
import {
  CONTRACT_ADDRESS,
  SIMPLE_STORAGE_ABI
} from '@/src/lib/contract'

import { FUJI_CHAIN_ID, FUJI_CHAIN_NAME } from '@/src/lib/constants';



export default function Page() {
  // ==============================
  //  WALLET
  // ==============================
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();

  // ==============================
  //  LOCAL STATE
  // ==============================
  const [inputValue, setInputValue] = useState('');
  const [txStatus, setTxStatus] = useState<string | null>(null);

  // ==============================
  //  READ CONTRACT
  // ==============================
  const {
    data: value,
    isLoading: isReading,
    refetch,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: SIMPLE_STORAGE_ABI,
    functionName: 'getValue',
  });

  // ==============================
  //  WRITE CONTRACT
  // ==============================
  const {
    writeContract,
    isPending: isWriting,
    isSuccess,
    isError,
  } = useWriteContract();

  const handleSetValue = () => {
    if (!inputValue) return;

    setTxStatus('Transaction pending...');

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: SIMPLE_STORAGE_ABI,
      functionName: 'setValue',
      args: [BigInt(inputValue)],
    });
  };

  // ==============================
  //  TX STATUS EFFECT
  // ==============================
  useEffect(() => {
    if (isSuccess) {
      setTxStatus('Transaction success ✅');
      setInputValue('');
      refetch();
    }

    if (isError) {
      setTxStatus('Transaction failed ❌');
    }
  }, [isSuccess, isError, refetch]);

  const wrongNetwork = isConnected && chainId !== FUJI_CHAIN_ID;

  // ==============================
  //  UI
  // ==============================
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md border border-gray-700 rounded-lg p-6 space-y-6">

        <h1 className="text-xl font-bold">
          Day 3 – Frontend dApp with Next JS
        </h1>

        {/* ==========================
            WALLET CONNECT
        ========================== */}
        {!isConnected ? (
          <button
            onClick={() => connect({ connector: injected() })}
            disabled={isConnecting}
            className="w-full bg-white text-black py-2 rounded"
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Connected Address</p>
            <p className="font-mono text-xs break-all">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>

            <p className="text-sm">
              Network:{' '}
              {wrongNetwork ? (
                <span className="text-red-400">Wrong Network</span>
              ) : (
                <span className="text-green-400">{FUJI_CHAIN_NAME}</span>
              )}
            </p>

            <button
              onClick={() => disconnect()}
              className="text-red-400 text-sm underline"
            >
              Disconnect
            </button>
          </div>
        )}

        {/* ==========================
            READ CONTRACT
        ========================== */}
        <div className="border-t border-gray-700 pt-4 space-y-2">
          <p className="text-sm text-gray-400">Contract Value</p>

          {isReading ? (
            <p>Loading...</p>
          ) : (
            <p className="text-2xl font-bold">{value?.toString()}</p>
          )}

          <button
            onClick={() => refetch()}
            className="text-sm underline text-gray-300"
          >
            Refresh value
          </button>
        </div>

        {/* ==========================
            WRITE CONTRACT
        ========================== */}
        <div className="border-t border-gray-700 pt-4 space-y-3">
          <p className="text-sm text-gray-400">Update Value</p>

          <input
            type="number"
            placeholder="New value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-2 rounded bg-black border border-gray-600"
            disabled={isWriting || wrongNetwork}
          />

          <button
            onClick={handleSetValue}
            disabled={isWriting || wrongNetwork}
            className="w-full bg-blue-600 py-2 rounded disabled:opacity-50"
          >
            {isWriting ? 'Updating...' : 'Set Value'}
          </button>

          {txStatus && (
            <p className="text-sm text-gray-400">{txStatus}</p>
          )}
        </div>

        <p className="text-xs text-gray-500 pt-2">
          Smart contract is the source of truth
        </p>

      </div>
    </main>
  );
}
