import { useEffect, useState } from "react";
import styled from "styled-components";
import CoinList from "./CoinList.tsx";
import CoinDetail from "./CoinDetail.tsx";

export type CoinType = {
    id: string;
    symbol: string;
    name: string;
    nameId: string;
    rank: number;
    price_usd: string;
    percent_change_24h: string;
    market_cap_usd: string;
    volume24: string;
};

type APIResponseType = { data: CoinType[] };

const Container = styled.div`
    display: flex;
    gap: 20px;
    height: calc(100dvh - 150px);
`;

function CoinPage() {
    const [coins, setCoins] = useState<CoinType[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCoin, setSelectedCoin] = useState<CoinType | null>(null);

    useEffect(() => {
        fetch("https://api.coinlore.net/api/tickers/?start=0&limit=50")
            .then(res => res.json())
            .then((json: APIResponseType) => setCoins(json.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Container>
            <CoinList coins={coins} loading={loading} selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin}/>
            <CoinDetail />
        </Container>
    );
}

export default CoinPage;
