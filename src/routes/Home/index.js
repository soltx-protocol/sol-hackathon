import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';

import Search from 'components/molecules/Search';
import {
	DuneAverageDailyTradingVolumeByPool,
	DuneAverageTradingVolumeInFeb2022,
	DuneDailyActiveWallet,
	DuneDailyFeeByPool,
	DuneFirstTrade,
	DuneLargestLiquidityProviderOnSOLUSDC,
	DuneLargestTradeByPool,
	DuneTop5Traders,
} from 'components/molecules/DuneChart';

import ControlBar from 'components/molecules/ControlBar';
import styles from './index.css';

const Home = () => {
	const [pool, setPool] = useState(null);

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
						<DuneDailyActiveWallet />
						<DuneAverageTradingVolumeInFeb2022 />
						<DuneFirstTrade />
						<DuneTop5Traders />
					</>
				) : (
					<>
						{pool?.value === 'SOL/USDC[aquafarm]' && <DuneLargestLiquidityProviderOnSOLUSDC />}
						<DuneAverageDailyTradingVolumeByPool account={pool?.account} />
						<DuneDailyFeeByPool poolTokenMint={pool?.poolTokenMint} feeAccount={pool?.feeAccount} />
						<DuneLargestTradeByPool
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
