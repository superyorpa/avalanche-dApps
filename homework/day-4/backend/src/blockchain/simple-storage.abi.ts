export const SIMPLE_STORAGE_ABI = [
  {
    type: "function",
    name: "getValue",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "event",
    name: "ValueUpdated",
    inputs: [
      {
        name: "newValue",
        type: "uint256",
        indexed: false,
      },
    ],
  },
] as const;
