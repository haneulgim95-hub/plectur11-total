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
    border-radius: 8px;
    font-weight: 800;
    font-size: 16px;

    &:hover {
        background-color: ${props => props.theme.colors.background.default};
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
    border: 1px solid ${props => props.theme.colors.divider};

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

    //useLocation(): react-router가 제공하는 현재사옹자 위치한 주소를 벌어오는 메서드
    // 위치한 주소등의 정보가 객체 상태로 리턴됨
    // 꺼낸이유 주소 "/" -> Home메뉴각 색상이 칠해지도록 하고 싶다.
    const { pathname } = useLocation();
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <HeaderContainer>
            <Logo>
                <FaSpaceShuttle color={palette.colors.primary} /> My Project
            </Logo>
            <NavMenu>
                {menuList.map((value, index) => (
                    // styled-components로 만들어진 컴포넌트에게 데이터를 전달해줄 때에는
                    // props로 전달해줘야 하지만, 그 속성명 앞에 $를 붙여서 styled-components에서 이용할 수 있도록 함
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
