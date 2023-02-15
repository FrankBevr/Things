import {create, mainnet, batterystation, ZTG, swapFeeFromFloat} from "@zeitgeistpm/sdk";
import { IPFS } from "@zeitgeistpm/web3.storage";
import { Keyring } from "@polkadot/keyring";
import {cryptoWaitReady} from  "@polkadot/util-crypto"
import { ZtgConfiguration } from "./ztgConfiguration"
import * as dotenv from 'dotenv';
dotenv.config()



class ZtgManager {
    async getSdk() {
        if (await this.isMainnet()){
            return await create(mainnet());
        } else {
            return await create(batterystation());
        }
    }

    async isMainnet() {
        return process.env.mainnet && process.env.mainnet === "true";
    }

    async getMarket(marketId) {
        const sdk = await this.getSdk();
        return await sdk.model.markets.get(marketId);
    }

    async getAllMarketIds() {
        const sdk = await this.getSdk();
        return await sdk.model.markets.get();
    }

    async createMarket(marketCreationArguments) {
        const sdk = await this.getSdk();

        await cryptoWaitReady()
        const keyring = new Keyring({ ss58Format: 73, type: 'sr25519' }) // battery station, zeitgeist testnet format
        const signer = keyring.addFromMnemonic(ZtgConfiguration.signerSeed);


        const params = {
            baseAsset: { Ztg: null },
            signer,
            disputeMechanism: "Authorized",
            marketType: { Categorical: 2 },
            oracle: signer.address,
            period: { Timestamp: [Date.now(), Date.now() + 1000 * 60 * 60 * ZtgConfiguration.defaultDurationHours] },
            deadlines: {
                disputeDuration: 5000,
                gracePeriod: 200,
                oracleDuration: 500,
            },
            metadata: {
                __meta: "markets",
                question: marketCreationArguments.question,
                description: marketCreationArguments.description,
                slug: marketCreationArguments.slug,
                categories: [
                    { name: "yes", ticker: "Y" },
                    { name: "no", ticker: "N" },
                ],
                tags: ZtgConfiguration.tags,
            },
            pool: {
                amount: ZtgConfiguration.defaultPoolAmount,
                swapFee: ZtgConfiguration.defaultSwapFee,
                weights: ["50000000000", "50000000000"],
            },
        };

        const response = await sdk.model.markets.create(params);
        // extracts the market and pool creation events from block
        const { market, pool } = response.saturate().unwrap();
        let marketCreationResult = new MarketCreationResult();
        marketCreationResult.marketId = market;
        marketCreationResult.poolId = pool;
        marketCreationResult.success = true;
        marketCreationResult.isTestnet = await this.isMainnet();

        console.log(`Market created with id: ${market.marketId}`);
        console.log(`Pool created with id: ${pool.poolId}`);

        return marketCreationResult;
    }
}



const manager = new ZtgManager();

// manager.getAllMarketIds()
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => process.exit());
manager.getMarket(568)
    .then(console.log)
    .catch(console.error)
    .finally(() => process.exit());
