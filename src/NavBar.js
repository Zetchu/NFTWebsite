import React from "react";
import MainMint from "./MainMint";

import { Box, Button, Flex, Image, Link, Spacer } from "@chakra-ui/react";
import Facebook from "./assets/facebook_32x32.png";
import Twitter from "./assets/twitter_32x32.png";
import Email from "./assets/email_32x32.png";

const NavBar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }

  return (
    <Flex justify="space-between" align="center" padding="30px">
      {/* LEFT SIDE */}
      <Flex justify="space-around" width="40%" padding="0 75px">
        <Link href="www.facebook.com">
          <Image src={Facebook} boxSize="42px" margin="0 15px"></Image>
        </Link>
        <Link href="www.twitter.com">
          <Image src={Twitter} boxSize="42px" margin="0 15px"></Image>
        </Link>
        <Link href="www.gmail.com">
          <Image src={Email} boxSize="42px" margin="0 15px"></Image>
        </Link>
      </Flex>

      <Flex justify="space-around" align="center" width="40%" padding="30px">
        <Box margin="0 15px">About</Box>
        <Spacer />
        <Box margin="0 15px">Mint</Box>
        <Spacer />
        <Box margin="0 15px">Team</Box>
        <Spacer />
        {/* Connect */}

        {isConnected ? (
          <p>Connected</p>
        ) : (
          <Button
            backgroundColor="#d6517d"
            borderRadius="5px"
            boxShadow="0px 2px 2px 1px #0f0f0f"
            color="white"
            cursor="pointer"
            fontFamily="inherit"
            padding="15px"
            margin="0 15px"
            onClick={connectAccount}
          >
            Connect
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default NavBar;
