import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const { API_URL, PRIVATE_KEY } = process.env;
// const ALCHEMY_API_KEY = "QWHzSh8MduwXC_Dy7st1M2iP7XDJOTuG";

// const SEPOLIA_PRIVATE_KEY = "73a45eb41f68402607c288269d99c81f6f37f5a7aabb30168a257e4337fb63e7";


const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: `${API_URL}`,
      accounts: [`${PRIVATE_KEY}`]
    }
  }
};

export default config;
