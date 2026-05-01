import type { RocketType } from "./RocketPage.tsx";
import { FaInfoCircle } from "react-icons/fa";
import styled from "styled-components";

type PropsType = {
    selectedRocket: RocketType | null;
}

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

                    {/*<div className={styles.info}>*/}
                    {/*    /!* h1은 block요소라, background가 width: 100%로 적용 중*/}
                    {/*그래서, 그 안에 span으로 inline을 주고, style을 적용*!/*/}
                    {/*    <h1>*/}
                    {/*        <span className={styles.name}>{rocket.name}</span>*/}
                    {/*    </h1>*/}
                    {/*    <p className={styles.description}>{rocket.description}</p>*/}
                    {/*    <div className={styles.specs}>*/}
                    {/*        <div className={styles.specItem}>*/}
                    {/*            <span className={styles.label}>발사 비용</span>*/}
                    {/*            <span className={styles.value}>*/}
                    {/*                $ {rocket.cost_per_launch.toLocaleString()}*/}
                    {/*            </span>*/}
                    {/*        </div>*/}
                    {/*        <div className={styles.specItem}>*/}
                    {/*            <span className={styles.label}>제조 국가</span>*/}
                    {/*            <span className={styles.value}>{rocket.country}</span>*/}
                    {/*        </div>*/}
                    {/*        <div className={styles.specItem}>*/}
                    {/*            <span className={styles.label}>상태</span>*/}
                    {/*            <span*/}
                    {/*                className={styles.value}*/}
                    {/*                style={{ color: rocket.active ? "#10b981" : "#ef4444" }}>*/}
                    {/*                {rocket.active ? "운용 중" : "비운용"}*/}
                    {/*            </span>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </Article>
            </Container>
        </DetailSection>
    );
}

export default RocketDetail;