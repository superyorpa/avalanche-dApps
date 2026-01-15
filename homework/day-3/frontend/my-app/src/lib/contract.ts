// data dari day 2

// contract address dari day 2
export const CONTRACT_ADDRESS =
  '0x085d8367f2b316bab7288c10f4c58cfd8e356738' as `0x${string}`;

// ABI dari day 2
export const SIMPLE_STORAGE_ABI = [
  {
    inputs: [],
    name: 'getValue',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '_value', type: 'uint256' }],
    name: 'setValue',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
