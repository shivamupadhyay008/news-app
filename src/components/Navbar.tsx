import styled from "@emotion/styled";
import { FaCog } from "react-icons/fa";
import LogoUrl from "../assets/logoIcon.svg";

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #fff;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  font-size: 24px;
  font-weight: bold;
`;

const SettingsIcon = styled.div`
  font-size: 24px;
  cursor: pointer;
  color: black;
`;
interface NavProps {
  setPrefDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavProps> = ({ setPrefDrawer }) => {
  return (
    <NavbarContainer>
      <Logo src={LogoUrl} alt="Innoscripta" />
      <SettingsIcon onClick={()=>setPrefDrawer(true)}>
        <FaCog />
      </SettingsIcon>
    </NavbarContainer>
  );
};

export default Navbar;
