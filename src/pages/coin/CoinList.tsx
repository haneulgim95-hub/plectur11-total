import type { CoinType } from "./CoinPage.tsx";
import type { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { FaBitcoin } from "react-icons/fa";

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

const CoinLi = styled.li`
    padding: 15px 20px;
    border-bottom: 1px solid ${props => props.theme.colors.divider};
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s;
   
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

const CoinPriceBox = styled.div`
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
                    {coins.map((value, index) => (
                        <CoinLi key={index}>
                            <CoinNameBox>
                                <strong>{value.name}</strong>
                                <span>{value.symbol}</span>
                            </CoinNameBox>
                            <CoinPriceBox>
                                <strong>$ {value.price_usd}</strong>
                                <span>{value.percent_change_24h}</span>
                            </CoinPriceBox>
                        </CoinLi>
                    ))}
                </CoinUl>
            )}
        </ListSection>
    );
}

export default CoinList;
