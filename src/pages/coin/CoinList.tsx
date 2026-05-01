import type { CoinType } from "./CoinPage.tsx";
import type { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { FaArrowDown, FaArrowUp, FaBitcoin } from "react-icons/fa";

type PropsType = {
    coins: CoinType[];
    loading: boolean;
    selectedCoin: CoinType | null;
    setSelectedCoin: Dispatch<SetStateAction<CoinType | null>>;
};

const ListSection = styled.aside`
    flex: 1;
    min-width: 300px;
    max-width: 400px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.colors.background.default};
    border: 1px solid ${props => props.theme.colors.divider};
    overflow: hidden; /* 안에 요소가 넘치면 잘라낸다 */
`;

const ListHeader = styled.div`
    padding: 20px;
    border-bottom: 1px solid ${props => props.theme.colors.divider};
    font-size: 18px;
    font-weight: 800;
    color: ${props => props.theme.colors.text.default};
    display: flex;
    align-items: center;
    gap: 10px;
`;

const LoadingMessage = styled.div`
    padding: 20px;
    text-align: center;
    color: ${props => props.theme.colors.text.disabled};
`;

const CoinUl = styled.ul`
    list-style: none;
    flex: 1;
    overflow-y: auto; // Y 방향으로 넘치게될 경우 스크롤바를 통해 표현하겠다.

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: ${props => props.theme.colors.divider};
    }
`;

const CoinLi = styled.li<{$isSelectedCoin: boolean}>`
    padding: 15px 20px;
    border-bottom: 1px solid ${props => props.theme.colors.divider};
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s;
    border-left: 4px solid ${props => props.$isSelectedCoin ? props.theme.colors.primary : "transparent"};
    background-color: ${props => props.$isSelectedCoin ? props.theme.colors.divider : "transparent"};
    
   
    &:hover {
        background-color: ${props => props.theme.colors.divider};
    }
`;

const CoinNameBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    strong {
        font-size: 16px;
        color: ${props => props.theme.colors.text.default};
    }

    span {
        font-size: 12px;
        color: ${props => props.theme.colors.text.disabled};
    }
`;

const CoinPriceBox = styled.div< { $isPositive: boolean}>`
    text-align: right;
    display: flex;
    flex-direction: column;
    gap: 4px;

    strong {
        font-size: 14px;
        color: ${props => props.theme.colors.text.default};
    }

    span {
        font-size: 12px;
        font-weight: 600;
        color: ${props => props.$isPositive ? props.theme.colors.success : props.theme.colors.error};
    }
`;



function CoinList({ coins, loading, selectedCoin, setSelectedCoin }: PropsType) {
    return (
        <ListSection>
            <ListHeader>
                <FaBitcoin /> Top 50 Coins
            </ListHeader>

            {loading ? (
                <LoadingMessage>데이터를 불러오는 중...</LoadingMessage>
            ) : (
                <CoinUl>
                    {coins.map((value, index) => {
                        const percentChange = parseFloat(value.percent_change_24h);
                        const isPositive = percentChange > 0 ;

                        return (
                            <CoinLi key={index} onClick={() => setSelectedCoin(value)} $isSelectedCoin={selectedCoin?.id === value.id}>
                                <CoinNameBox>
                                    <strong>{value.name}</strong>
                                    <span>{value.symbol}</span>
                                </CoinNameBox>
                                <CoinPriceBox $isPositive={isPositive}>
                                    <strong>$ {value.price_usd}</strong>
                                    <span>
                                        {isPositive ? (
                                            <FaArrowUp size={10} />
                                        ) : (
                                            <FaArrowDown size={10} />
                                        )}
                                        {value.percent_change_24h}
                                    </span>
                                </CoinPriceBox>
                            </CoinLi>
                        );
                    })}
                </CoinUl>
            )}
        </ListSection>
    );
}

export default CoinList;
