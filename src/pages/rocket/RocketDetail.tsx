import type { RocketType } from "./RocketPage.tsx";
import { FaInfoCircle } from "react-icons/fa";
import styled from "styled-components";

type PropsType = {
    selectedRocket: RocketType | null;
};

const DetailSection = styled.div`
    flex: 1;
    border-radius: 16px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.colors.background.paper};
    border: 1px solid ${props => props.theme.colors.divider};
`;

const EmptyDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.colors.text.disabled};
    gap: 15px;

    svg {
        font-size: 48px;
        opacity: 0.5;
        color: ${props => props.theme.colors.warning};
    }
`;

const Container = styled.article`
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 24px;
    overflow-y: auto;
`;

const BackBtn = styled.button`
    color: white;
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 32px;
    padding: 8px 12px;
    border-radius: 6px;
    background-color: ${props => props.theme.colors.primary};
    border: none;
    transition: all 0.5s;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }
`;

const Article = styled.article`
    background-color: ${props => props.theme.colors.background.default};
    border-radius: 24px;
    border: 1px solid ${props => props.theme.colors.divider};
    overflow: hidden;
`;

const ImageWrapper = styled.div`
    width: 100%;
    height: 400px;
    overflow: hidden;
`;

const RocketImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover; /* 부모에 딱 맞게 들어가도록 */
    transition: all 0.5s;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
    }
`;

const Info = styled.div`
    padding: 40px;
    
`;

const RocketName = styled.span`
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 16px;
    color: ${props => props.theme.colors.primary}
`;

const Description = styled.p`
    font-size: 1.2rem;
    color: ${props => props.theme.colors.text.default};
    line-height: 1.8;
    margin-bottom: 32px;
`;

const Specs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const SpecItem = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Label = styled.span`
    color: ${props => props.theme.colors.text.default};
    font-weight: 600;
`;

const Value = styled.span`
    color: ${props => props.theme.colors.text.disabled};
`;

const Active = styled.span<{$isActive:boolean}>`
    color: ${props => props.$isActive? "#10b981" : "#ef4444"}
`;
function RocketDetail({ selectedRocket }: PropsType) {
    if (!selectedRocket) {
        return (
            <DetailSection>
                <EmptyDetail>
                    <FaInfoCircle />
                    <p>좌측 목록에서 로켓을 선택해주세요.</p>
                </EmptyDetail>
            </DetailSection>
        );
    }

    return (
        <DetailSection>
            <Container>
                <BackBtn>&larr; 목록으로 돌아가기</BackBtn>
                <Article>
                    {selectedRocket.flickr_images[0] && (
                        <ImageWrapper>
                            <RocketImage
                                src={selectedRocket.flickr_images[0]}
                                alt={selectedRocket.name}
                            />
                        </ImageWrapper>
                    )}

                    <Info>
                        <h1>
                            <RocketName>{selectedRocket.name}</RocketName>
                        </h1>
                        <Description>{selectedRocket.description}</Description>
                        <Specs>
                            <SpecItem>
                                <Label>발사 비용</Label>
                                <Value>$ {selectedRocket.cost_per_launch.toLocaleString()}</Value>
                            </SpecItem>
                            <SpecItem>
                                <Label>제조 국가</Label>
                                <Value>{selectedRocket.country}</Value>
                            </SpecItem>
                            <SpecItem>
                                <Label>상태</Label>
                                <Active
                                    $isActive={selectedRocket.active}>
                                    {selectedRocket.active ? "운용 중" : "비운용"}
                                </Active>
                            </SpecItem>
                        </Specs>
                    </Info>
                </Article>
            </Container>
        </DetailSection>
    );
}

export default RocketDetail;
