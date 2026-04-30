import styled, { useTheme } from "styled-components";
import { type ReactNode, useContext } from "react";
import {
    FaBitcoin,
    FaBook,
    FaCheckSquare,
    FaFilm,
    FaHome,
    FaMoon,
    FaRocket,
    FaSpaceShuttle,
    FaSun,
} from "react-icons/fa";
import { Link, useLocation } from "react-router";
import { ThemeContext } from "../../contexts/theme/ThemeContext.ts";

const HeaderContainer = styled.header`
    width: 100%;
    height: 70px;
    background-color: ${props => props.theme.colors.background.paper};
    border-bottom: ${props => props.theme.colors.divider};
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Logo = styled.div`
    color: ${props => props.theme.colors.text.default};
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 24px;
    font-weight: 800;
`;

const NavMenu = styled.nav`
    display: flex;
    gap: 20px;
`;

const NavItem = styled(Link)<{ $isActive: boolean }>`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    color: ${props =>
        props.$isActive ? props.theme.colors.primary : props.theme.colors.text.disabled};
    background-color: ${props =>
        props.$isActive ? props.theme.colors.background.default : "transparent"};
    border: ${props => props.theme.colors.divider};
    border-radius: 8px;
    font-weight: 800;
    font-size: 16px;

    &:hover {
        border-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.primary};
    }
`;

const ThemeToggleButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 36px;
    gap: 8px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.5s;
    background-color: ${props => props.theme.colors.background.default};
    color: ${props => props.theme.colors.text.default};
    border: ${props => props.theme.colors.divider};

    &:hover {
        border-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.primary};
`;

type menuType = {
    icon: ReactNode;
    path: string;
    label: string;
};

const menuList: menuType[] = [
    {
        path: "/",
        label: "Home",
        icon: <FaHome size={18} />,
    },
    {
        path: "/todo",
        label: "Todo",
        icon: <FaCheckSquare size={18} />,
    },
    {
        path: "/coin",
        label: "Coin",
        icon: <FaBitcoin size={18} />,
    },
    {
        path: "/movie",
        label: "Movie",
        icon: <FaFilm size={18} />,
    },
    {
        path: "/rocket",
        label: "Rocket",
        icon: <FaRocket size={18} />,
    },
    {
        path: "/book",
        label: "Book",
        icon: <FaBook size={18} />,
    },
];

function Header() {
    // styled-components 밖에서 현재 테마를 꺼내서 쓰기 위해서는?
    // useTheme() : styled-components가 제공하는 측
    // 현재 테마에 해당하는 테마 정보를 리턴하는 메소드
    const palette = useTheme();
    const { pathname } = useLocation();
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <HeaderContainer>
            <Logo>
                <FaSpaceShuttle color={palette.colors.primary} /> My Project
            </Logo>
            <NavMenu>
                {menuList.map((value, index) => (
                    <NavItem
                        to={value.path}
                        key={index}
                        $isActive={
                            value.path === "/" ? pathname === "/" : pathname.startsWith(value.path)
                        }>
                        {value.icon}
                        {value.label}
                    </NavItem>
                ))}
            </NavMenu>
            <ThemeToggleButton onClick={toggleTheme}>{theme === "light" ? <><FaSun size={16} />라이트</> :
                <><FaMoon size={16} />다크</>}</ThemeToggleButton>
        </HeaderContainer>
    );
}

export default Header;
