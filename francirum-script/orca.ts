import { readFile } from "mz/fs";
import { Connection, Keypair } from "@solana/web3.js";
import { getOrca, OrcaFarmConfig, OrcaPoolConfig, Network } from "@orca-so/sdk";
import Decimal from "decimal.js";

const mainnetURL = "https://api.mainnet-beta.solana.com"

export async function getQuoteFromOrca(token) {
  const connection = new Connection(mainnetURL, "singleGossip");
  const orca = getOrca(connection);

  try {
    function getUSDCQuoteConfig(token) {
      let pair = `${token}_USDC`
      return OrcaPoolConfig[pair]
    }
    const orcaSolPool = orca.getPool(getUSDCQuoteConfig(token));
    const solToken = orcaSolPool.getTokenA();
    const solAmount = new Decimal(1);
    const quote = await orcaSolPool.getQuote(solToken, solAmount);
    const orcaAmount = quote.getMinOutputAmount();
    const orcaRate = quote.getRate();
    return orcaRate
  } catch (err) { 
    console.warn(err);
  }
};