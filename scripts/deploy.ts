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
  
  const auction1 = await DutchAuction.deploy(
    ethers.utils.parseEther('2.0'),
    1,
    "Bike"
  )
  await auction1.deployed()

  const auction2 = await DutchAuction.deploy(
    ethers.utils.parseEther('2.0'),
    1,
    "Car"
  )
  await auction2.deployed()

  saveFrontendFiles(
    path.join(__dirname, '/..', 'frontend/src/contracts'),
    {
      AuctionBike: {
        contract: "DutchAuction",
        address: auction1.address
      },
      AuctionCar: {
        contract: "DutchAuction",
        address: auction2.address
      }
    }) 

  
  
}

//====================================================//
//====================================================//

function saveFrontendFiles(contractsDir: string, contracts: { [key: string]: { contract: string, address: string} } ) {

  const fullContacts: { [key: string]: { name: string, contract: string, address: string, abi: any }} = {};
  const contactTypes: { [key: string]: boolean } = {};

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir)
  }

  for (const [name, {contract, address}] of Object.entries(contracts)) {
    
    

    const ContractArtifact = hre.artifacts.readArtifactSync(contract)

    fullContacts[name] = { name, address, contract, abi: ContractArtifact.abi };
    contactTypes[contract] = true;
//    fs.writeFileSync(
//      path.join(contractsDir, '/', contract + ".json"),
//      JSON.stringify(ContractArtifact, null, 2)
//    )
  }

  const text = `
import { ${Object.keys(contactTypes).join(', ')} } from '../../../typechain-types';
import { ethers } from 'ethers';

export type DeployedContracts = {
    ${Object.keys(fullContacts).map(key => fullContacts[key].name+ ": " + fullContacts[key].contract).join(', \n\t\t')}  
}

export function connectAll(provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider) : DeployedContracts
{
    let a: any = {};

    ${Object.keys(fullContacts).map(key => {
      return `a['${fullContacts[key].name}'] = new ethers.Contract(
        deployedContracts.${fullContacts[key].name}.address,
        deployedContracts.${fullContacts[key].name}.abi, provider
        ) as ${fullContacts[key].contract};`
    }).join('\n\t\t\n\t\t')}

    return a as DeployedContracts;
}



const deployedContracts =
  ` + JSON.stringify(fullContacts, undefined, 2);

  fs.writeFileSync(
    path.join(contractsDir, '/', 'deployedContracts.ts'),
    text
  )
}

//====================================================//
//====================================================//

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
