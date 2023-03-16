import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";

import roboPunksNFT from "./RoboPunksNFT.json";

const roboPunksNFTAdress = "0x24Ae8Af749739966DcF3f9Bc52499bE778e90a82";

const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        roboPunksNFTAdress,
        roboPunksNFT.abi,
        signer
      );
      try {
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
        });
        console.log("response: ", response);
      } catch (error) {
        console.log("error", error);
      }
    }
  }

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };
  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  return (
    <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
      <Box width="520px">
        <div>
          <Text fontSize="48px" textShadow="0 5px #000">
            RoboPunks
          </Text>
          <Text
            fontSize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 2px 2px #000"
          >
            It's 2222. Can the RoboPunks NFT save humans from the destructive
            future we made for ourselves?
          </Text>
        </div>

        {isConnected ? (
          <div>
            <Flex align="center" justify="center ">
              <Button
                onClick={handleDecrement}
                backgroundColor="#d6517d"
                boxShadow="0px 2px 2px 1px #0f0f0f"
                borderRadius="5px"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
              >
                -
              </Button>
              <Input
                readOnly
                fontFamily="inherit"
                type="number"
                width={100}
                height={40}
                textAlign="center"
                paddingLeft={19}
                marginTop={10}
                value={mintAmount}
              />
              <Button
                backgroundColor="#d6517d"
                boxShadow="0px 2px 2px 1px #0f0f0f"
                borderRadius="5px"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
                onClick={handleIncrement}
              >
                +
              </Button>
            </Flex>
            <Button
              backgroundColor="#d6517d"
              boxShadow="0px 2px 2px 1px #0f0f0f"
              borderRadius="5px"
              color="white"
              cursor="pointer"
              fontFamily="inherit"
              padding="15px"
              marginTop="10px"
              onClick={handleMint}
            >
              Mint Now
            </Button>
          </div>
        ) : (
          <p>You are not connected yet</p>
        )}
      </Box>
    </Flex>
  );
};

export default MainMint;
