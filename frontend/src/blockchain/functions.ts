import { ethers } from "ethers";

export function sleep(ms: number)
{
  return new Promise(resolve => setTimeout(resolve, ms));
} 

export  function fromWei(wei: ethers.BigNumberish | boolean | undefined, digits: number =18): string
{
  if (wei === undefined)
    return ('undefined')
  if (typeof wei === 'boolean')
    return ('BOOLEAN!!!')
  return ethers.utils.formatUnits(wei,digits); 
} 

export function toWei(eth: string, digits: number = 18): string
{
  return ethers.utils.parseUnits(eth,digits).toString();
} 

export function fromWei2(wei: ethers.BigNumberish | boolean | undefined,digits: number=18): string 
{
  if (wei === undefined)
    return ('undefined')
  if (typeof wei === 'boolean')
    return ('BOOLEAN!!!')
  return parseFloat(ethers.utils.formatUnits(wei,digits).toString()).toFixed(2);
} 

export function fromWei4(wei: ethers.BigNumberish | boolean | undefined,digits: number=18): string
{
  if (wei === undefined)
    return('undefined')
  if (typeof wei === 'boolean')
    return ('BOOLEAN!!!')
  return parseFloat(ethers.utils.formatUnits(wei,digits).toString()).toFixed(4);
} 
