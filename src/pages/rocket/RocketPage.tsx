import styled from "styled-components";
import RocketDetail from "./RocketDetail.tsx";
import { useEffect, useState } from "react";
import RocketList from "./RocketList.tsx";

export type RocketType = {
    id: string;
    name: string;
    description: string;
    active: boolean;
    cost_per_launch: number;
    country: string;
    flickr_images: string[];
};


const Container = styled.div`
    display: flex;
    gap: 20px;
    height: calc(100dvh - 150px);
`;

function RocketPage() {
    const [rockets, setRockets] = useState<RocketType[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRocket, setSelectedRocket] = useState<RocketType | null>(null);

    useEffect(() => {
        fetch("https://api.spacexdata.com/v4/rockets")
            .then(res => res.json())
            .then((json: RocketType[]) => {
                setRockets(json);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                // finally는 성공(then)이든, 실패(catch)든 그 항목들을 실행하고 난 마지막에 실행되어야 하는 내용물을 기재
                setLoading(false);
            });
    }, []);

    return (
        <Container>
            <RocketList
                rockets={rockets}
                loading={loading}
                selectedRocket={selectedRocket}
                setSelectedRocket={setSelectedRocket}
            />
            <RocketDetail selectedRocket={selectedRocket} />
        </Container>
    );
}
export default RocketPage;
