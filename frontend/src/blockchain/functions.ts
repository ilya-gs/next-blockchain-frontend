import { ethers } from "ethers";

export function sleep(ms: number)
{
  return new Promise(resolve => setTimeout(resolve, ms));
} 

export  function fromWei(wei: ethers.BigNumberish, digits: number =18): string
{
  return ethers.utils.formatUnits(wei,digits); 
} 

export function toWei(eth: string, digits: number = 18): string
{
  return ethers.utils.parseUnits(eth,digits).toString();
} 

export function fromWei2(wei: ethers.BigNumberish,digits: number=18): string 
{
  return parseFloat(ethers.utils.formatUnits(wei,digits).toString()).toFixed(2);
} 

export function fromWei4(wei: ethers.BigNumberish,digits: number=18)
{
  return parseFloat(ethers.utils.formatUnits(wei,digits).toString()).toFixed(4);
} 
