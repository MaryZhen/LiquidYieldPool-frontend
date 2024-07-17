import {
    ethers,
  } from 'ethers'
export function formatEther(bigNumber, fractionDigits=18): number|any {
    if (bigNumber === '' || bigNumber === undefined || bigNumber === null) {
      return 0;
    } else {
      return parseFloat(ethers.formatUnits(bigNumber, fractionDigits));
    }
  }

  export function parseEther(value) {
    try {
      return ethers.parseUnits(value+'', "ether");
    } catch(e) {
      console.error(e);
      return value;
    }
  }
  export function seperateNumWithComma(num) {
    return /\d/.test(num) && ("" + num).replace(/\B(?=(?:\d{3})+(?!\d))/g, ",") || ''
}