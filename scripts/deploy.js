const { ethers } = require("ethers");
const fs = require('fs');
const path = require('path');



const provider = new ethers.WebSocketProvider("ws://127.0.0.1:8545");
const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'; 


const wallet = new ethers.Wallet(privateKey, provider);

const jsonFilePath = path.resolve(__dirname, './AirBnB.json');
  
// Read the JSON file
const fileContent = fs.readFileSync(jsonFilePath, 'utf8');
const contractJson = JSON.parse(fileContent);

const abi = contractJson.abi;
const bytecode = contractJson.bytecode;

nonce = 15;


async function deployContract() {

  const balance = await provider.getBalance('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
  const formattedBalance = ethers.formatEther(balance);
  console.log(`Your ETH balance: ${formattedBalance} ETH`);



    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    // const overrides = {
    //     gasLimit: 30000000,
    //     gasPrice: ethers.parseUnits('4', 'gwei'),
    //     nonce : nonce,
    // };

    try {
        nonce = nonce + 1;
        console.log("Deploying contract...");
        const contract = await factory.deploy({nonce:nonce});
        await contract.deploymentTransaction();
        console.log('Contract deployed at address:', contract.address);
    } catch (error) {
        console.error('Error deploying contract:', error);
        return null;
    }
}

deployContract();

async function main() {
    const contract = await deployContract();
    if (!contract) return;


    try {


             nonce = nonce + 1;
             const addRentalsTx = await contract.addRentals(
              "Cozy Apartment",
              "New York",
              "40.7128",
              "-74.0060",
              "A nice and cozy apartment in the heart of the city.",
              "Close to central park and major attractions.",
              "https://example.com/img.jpg",
              4,
              1,
              []
            ,{nonce: nonce});
          
            await addRentalsTx.wait();
          
            console.log("Rental added successfully");
            nonce = nonce + 1;
            const rentalInfo = await contract.getRental(0, {nonce:nonce});
            console.log("Rental Info:", rentalInfo);

            nonce = nonce + 1;
            const newBookings = ["2023-06-15", "2023-06-16"];
            const addDatesBookedTx = await contract.addDatesBooked(0, newBookings, { value: ethers.utils.parseEther('2') },{nonce:nonce});
          
            await addDatesBookedTx.wait();
            console.log("Dates booked successfully");

            nonce = nonce + 1;
            const updatedRentalInfo = await contract.getRental(0,{nonce:nonce});
            console.log("Updated Rental Info:", updatedRentalInfo);

            
           
    }

   catch (error) {
        console.error('Error:', error);
    }


  }
main();
