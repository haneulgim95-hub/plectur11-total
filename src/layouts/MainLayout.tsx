import styled from "styled-components";
import { Outlet } from "react-router";
import Header from "../components/layout/Header.tsx";

const LayoutWrapper = styled.div`
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
`;

const MainContent = styled.main`
    flex: 1;
    padding: 40px;
    display: flex;
    flex-direction: column;
`;

function MainLayout() {
    return (
        <LayoutWrapper>
            <Header />
            <MainContent>
                <Outlet />
            </MainContent>
        </LayoutWrapper>
    );
}

export default MainLayout;
