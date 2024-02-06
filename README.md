# Bitcoin Transaction Builder

This Node.js script serves as a Bitcoin transaction builder with functions to generate a redeem script, derive an address from the redeem script, construct a transaction that sends bitcoins to the derived address, and construct another transaction that spends from the previously created transaction. Each task is implemented as a separate function.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)

## Prerequisites

- Node.js installed (https://nodejs.org/)
- npm (Node Package Manager) installed (included with Node.js)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/repzlaw/first-bitcoin-transaction.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd bitcoin-transaction-builder
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

## Usage

The script provides several functions that can be utilized for various Bitcoin transaction-related tasks. Uncomment and modify the provided example lines based on your specific needs.

- `generateRedeemScript(preImage)`: Generates a redeem script from a given pre-image.
- `deriveAddress(redeemScript)`: Derives an address from a given redeem script.
- `constructTransaction(address, amount)`: Constructs a transaction that sends bitcoins to the provided address.
- `spendTransaction(previousTxHex, unlockingScript, mainOutput, changeOutput)`: Constructs a transaction that spends from a previous transaction.
