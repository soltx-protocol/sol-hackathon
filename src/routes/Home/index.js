import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';

import Search from 'components/molecules/Search';
import {
	DuneAverageDailyTradingVolumeByPool,
	DuneAverageTradingVolumeInFeb2022,
	DuneDailyActiveWallet,
	DuneDailyFeeByPool,
	DuneDailyLPDepositWithdrawByPool,
	DuneDailySwapCountByPool,
	DuneFirstTrade,
	DuneLargestLiquidityProvider,
	DuneLargestLiquidityProviderTable,
	DuneLargestLPByPool,
	DuneLargestTradeByPool,
	DuneLeastLPByPool,
	DuneTop5Traders,
} from 'components/molecules/DuneChart';

import ControlBar from 'components/molecules/ControlBar';
import { getGlobalFarm } from 'defi/poolConfig';
import styles from './index.css';

const Home = () => {
	const [pool, setPool] = useState(null);

	const globalFarm = pool ? getGlobalFarm(pool?.account) : {};

	const onSearch = option => {
		setPool(option);
	};

	const onClear = () => {
		setPool(null);
	};

	return (
		<div className={styles.home}>
			<ControlBar className={styles.top} />
			<Search className={styles.search} onSearch={onSearch} onClear={onClear} />
			<div className={styles.header}>{pool === null ? 'Overall' : `Overall - ${pool.value}`}</div>
			<div className={styles.content}>
				{pool === null ? (
					<>
						<DuneFirstTrade className={styles.wide} />
						<DuneLargestLPByPool className={styles.wide} />
						<DuneLeastLPByPool className={styles.wide} />
						<DuneDailyActiveWallet />
						<DuneAverageTradingVolumeInFeb2022 />
						<DuneTop5Traders />
					</>
				) : (
					<>
						<DuneLargestTradeByPool
							className={styles.wide}
							account={pool?.account}
							feeAccount={pool?.feeAccount}
							tokenAccountB={pool?.tokenAccountB}
						/>
						<DuneLargestLPByPool className={styles.wide} baseTokenMint={pool?.poolTokenMint} />
						<DuneLeastLPByPool className={styles.wide} baseTokenMint={pool?.poolTokenMint} />
						<DuneDailyActiveWallet
							account={pool?.account}
							feeAccount={pool?.feeAccount}
							tokenAccountB={pool?.tokenAccountB}
						/>
						<DuneDailyLPDepositWithdrawByPool
							globalFarm={globalFarm?.account}
							farmTokenMint={globalFarm?.farmTokenMint}
						/>
						<DuneLargestLiquidityProvider
							className={styles.largeWide}
							globalFarm={globalFarm?.account}
							farmTokenMint={globalFarm?.farmTokenMint}
						/>
						<DuneLargestLiquidityProviderTable
							className={styles.largeWide}
							globalFarm={globalFarm?.account}
							farmTokenMint={globalFarm?.farmTokenMint}
						/>
						<DuneDailyFeeByPool poolTokenMint={pool?.poolTokenMint} feeAccount={pool?.feeAccount} />
						<DuneAverageDailyTradingVolumeByPool account={pool?.account} />
						<DuneDailySwapCountByPool
							account={pool?.account}
							feeAccount={pool?.feeAccount}
							tokenAccountB={pool?.tokenAccountB}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default hot(Home);
