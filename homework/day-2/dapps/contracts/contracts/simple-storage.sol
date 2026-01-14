// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStorage {
    
    // State Variables
    uint256 private storedValue;
    address public owner;

    // Events
    event OwnerSet(address indexed oldOwner, address indexed newOwner);
    event ValueUpdated(uint256 newValue);

    // Constructor
    constructor() {
        address oldOwner = owner;
        owner = msg.sender;
        emit OwnerSet(oldOwner, owner);
    }

    // Write Function
    function setValue(uint256 _value) public {
        storedValue = _value;
        emit ValueUpdated(_value);
    }

    // Read Function
    function getValue() public view returns (uint256) {
        return storedValue;
    }
}
