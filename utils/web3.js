import { ethers } from 'ethers';
import { abi, address } from './contractInfo'; // Ensure you have these details from your deployment

let provider;
let signer;
let contract;

export const initWeb3 = async () => {
  if (!provider) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(address, abi, signer);
  }
  return contract;
};

export const getRental = async (id) => {
  const rental = await contract.getRental(id);
  return rental;
};

export const addRental = async (rentalInfo) => {
  const tx = await contract.addRentals(
    rentalInfo.name,
    rentalInfo.city,
    rentalInfo.lat,
    rentalInfo.long,
    rentalInfo.unoDescription,
    rentalInfo.dosDescription,
    rentalInfo.imgUrl,
    rentalInfo.maxGuests,
    rentalInfo.pricePerDay,
    rentalInfo.datesBooked
  );
  await tx.wait();
};

export const addDatesBooked = async (id, newBookings, price) => {
  const tx = await contract.addDatesBooked(id, newBookings, { value: ethers.utils.parseEther(price) });
  await tx.wait();
};
