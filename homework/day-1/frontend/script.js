// ===============================
// DOM Elements
// ===============================
const connectBtn = document.getElementById("connectBtn");
const disconnectBtn = document.getElementById("disconnectBtn");

const statusEl = document.getElementById("status");
const addressEl = document.getElementById("address");
const networkEl = document.getElementById("network");
const balanceEl = document.getElementById("balance");
const nameEl = document.getElementById("name");
const nimEl = document.getElementById("nim");

// ===============================
// Student Identity 
// ===============================
const STUDENT_NAME = "Raditya Prima Alfiansyah";
const STUDENT_NIM = "231011403745";

// ===============================
// Network Config
// ===============================
const AVALANCHE_FUJI_CHAIN_ID = "0xa869";

// ===============================
// State
// ===============================
let currentAccount = null;
let isConnectedByButton = false;

// ===============================
// Utils
// ===============================
function shortenAddress(address) {
  return address.slice(0, 6) + "..." + address.slice(-4);
}

function formatAvaxBalance(balanceWei) {
  return (parseInt(balanceWei, 16) / 1e18).toFixed(4);
}

// ===============================
// Disconnect Wallet 
// ===============================
function disconnectWallet() {
  currentAccount = null;
  isConnectedByButton = false;

  statusEl.textContent = "Disconnected";
  statusEl.style.color = "#ffffff";

  addressEl.textContent = "-";
  networkEl.textContent = "-";
  balanceEl.textContent = "-";
  nameEl.textContent = "-";
  nimEl.textContent = "-";

  connectBtn.disabled = false;
  connectBtn.textContent = "Connect Wallet";
  disconnectBtn.style.display = "none";
}

// ===============================
// Connect Wallet
// ===============================
async function connectWallet() {
  if (!window.ethereum) {
    alert("Core Wallet tidak terdeteksi. Silakan install Core Wallet.");
    return;
  }

  try {
    statusEl.textContent = "Connecting...";
    isConnectedByButton = true;

    // Request wallet access
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    currentAccount = accounts[0];
    addressEl.textContent = shortenAddress(currentAccount);

    // Detect network
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    if (chainId !== AVALANCHE_FUJI_CHAIN_ID) {
      statusEl.textContent = "Please switch to Avalanche Fuji ❌";
      statusEl.style.color = "#fbc531";
      networkEl.textContent = "Wrong Network";
      balanceEl.textContent = "-";
      return;
    }

    // Network OK
    networkEl.textContent = "Avalanche Fuji Testnet ✅";
    statusEl.textContent = "Connected";
    statusEl.style.color = "#4cd137";

    // Get balance
    const balanceWei = await window.ethereum.request({
      method: "eth_getBalance",
      params: [currentAccount, "latest"],
    });

    balanceEl.textContent = formatAvaxBalance(balanceWei);

    // Show identity AFTER successful connect
    nameEl.textContent = STUDENT_NAME;
    nimEl.textContent = STUDENT_NIM;

    connectBtn.disabled = true;
    connectBtn.textContent = "Connected";
    disconnectBtn.style.display = "block";
  } catch (error) {
    console.error(error);
    statusEl.textContent = "Connection Failed ❌";
    statusEl.style.color = "#ff7675";
    isConnectedByButton = false;
  }
}

// ===============================
// Event Listeners
// ===============================
connectBtn.addEventListener("click", connectWallet);
disconnectBtn.addEventListener("click", disconnectWallet);

if (window.ethereum) {
  // Account changed
  window.ethereum.on("accountsChanged", (accounts) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      currentAccount = accounts[0];
      addressEl.textContent = shortenAddress(currentAccount);

      if (isConnectedByButton) {
        nameEl.textContent = STUDENT_NAME;
        nimEl.textContent = STUDENT_NIM;
      }
    }
  });

  // Network changed
  window.ethereum.on("chainChanged", (chainId) => {
    if (chainId !== AVALANCHE_FUJI_CHAIN_ID) {
      statusEl.textContent = "Wrong Network ❌";
      statusEl.style.color = "#fbc531";
      networkEl.textContent = "Wrong Network";
      balanceEl.textContent = "-";
    } else {
      networkEl.textContent = "Avalanche Fuji Testnet ✅";
      statusEl.textContent = "Connected";
      statusEl.style.color = "#4cd137";
    }
  });
}
