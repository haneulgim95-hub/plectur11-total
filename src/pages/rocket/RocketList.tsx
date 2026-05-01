import type { RocketType } from "./RocketPage.tsx";
import type { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { FaRocket } from "react-icons/fa";
import RocketCard from "../../components/layout/RocketCard.tsx";

type PropsType = {
    rockets: RocketType[];
    loading: boolean;
    selectedRocket: RocketType | null;
    setSelectedRocket: Dispatch<SetStateAction<RocketType | null>>;
};

const ListSection = styled.aside`
    width: 500px;
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

const RocketUl = styled.ul`
    padding: 20px;
    list-style: none;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: auto; // Y 방향으로 넘치게될 경우 스크롤바를 통해 표현하겠다.

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: ${props => props.theme.colors.divider};
    }
`;



function RocketList({ rockets, loading, selectedRocket, setSelectedRocket }: PropsType) {
    return (
        <ListSection>
            <ListHeader>
                <FaRocket />
                SpaceX Archive
            </ListHeader>

            {loading ? (
                <LoadingMessage>데이터를 불러오는 중</LoadingMessage>
            ) : (
                <RocketUl>
                    {rockets.map((value, index) => {
                        return (
                            <RocketCard
                                rocket={value}
                                key={index}
                                setSelectedRocket={setSelectedRocket}
                                selectedRocket={selectedRocket}
                            />
                        );
                    })}
                </RocketUl>
            )}
        </ListSection>
    );
}
export default RocketList;
