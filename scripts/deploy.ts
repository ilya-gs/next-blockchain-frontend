/*import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = ethers.utils.parseEther("1");

  const Lock = await ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.deployed();

  console.log(`Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});*/

import hre from "hardhat"
const ethers = hre.ethers;
const network = hre.network;
import fs from 'fs';
import path from 'path';

//====================================================//
//====================================================//

async function main(): Promise<void> {
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
      "gets automatically created and destroyed every time. Use the Hardhat" +
      " option '--network localhost'"
    );
  }

  const [deployer] = await ethers.getSigners()

  console.log("Deploying with", deployer.address)

  const DutchAuction = await ethers.getContractFactory("DutchAuction", deployer)
  const auction = await DutchAuction.deploy(
    ethers.utils.parseEther('2.0'),
    1,
    "Motorbike"
  )
  await auction.deployed()

  saveFrontendFiles(
    path.join(__dirname, '/..', 'front/contracts'),
    { DutchAuction: auction.address })
  
}

//====================================================//
//====================================================//

function saveFrontendFiles(contractsDir: string,contracts: { [key: string]: string }) {

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir)
  }

  Object.entries(contracts).forEach((contract_item) => {
    const [name, contractAddress] = contract_item

    if (contractAddress) {
      fs.writeFileSync(
        path.join(contractsDir, '/', name + '-contract-address.json'),
        JSON.stringify({ [name]: contractAddress }, undefined, 2)
      )
    }

    const ContractArtifact = hre.artifacts.readArtifactSync(name)

    fs.writeFileSync(
      path.join(contractsDir, '/', name + ".json"),
      JSON.stringify(ContractArtifact, null, 2)
    )
  })
}

//====================================================//
//====================================================//

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
