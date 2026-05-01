import styled from "styled-components";
import type { RocketType } from "../../pages/rocket/RocketPage.tsx";
import type { Dispatch, SetStateAction } from "react";

type Props = {
    rocket: RocketType;
    setSelectedRocket: Dispatch<SetStateAction<RocketType | null>>;
    selectedRocket: RocketType | null;
};

const RocketLi = styled.li<{ $isSelected: boolean }>`
    border-radius: 12px;
    padding: 15px 20px;
    cursor: pointer;
    transition: all 0.3s;
    border: 1px solid ${props => props.theme.colors.divider};
    border-left: 4px solid
        ${props => (props.$isSelected ? props.theme.colors.primary : props.theme.colors.divider)};

    &:hover {
        background-color: ${props => props.theme.colors.divider};
    }
`;

const Name = styled.h3`
    margin-bottom: 12px;
    font-size: 1.5rem;
    font-weight: 700;
    color: ${props => props.theme.colors.text.default};
    transition: all 0.5s;

    &:hover {
        color: ${props => props.theme.colors.primary};
    }
`;

const Country = styled.div`
    color: ${props => props.theme.colors.text.disabled};
    display: flex;
    align-items: center;
    gap: 6px;
`;

function RocketCard({ rocket, setSelectedRocket, selectedRocket }: Props) {
    return (
        <RocketLi
            onClick={() => setSelectedRocket(rocket)}
            $isSelected={selectedRocket?.id === rocket.id}>
            <Name>{rocket.name}</Name>
            <Country>{rocket.country}</Country>
        </RocketLi>
    );
}

export default RocketCard;
