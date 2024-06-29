import { FC } from "react";
import { Nav, NavLinkStyled } from "./Navigation.styled";

const Navigation: FC = () => {
  return (
    <Nav>
      <NavLinkStyled to="/">Home</NavLinkStyled>
      <NavLinkStyled to="/transaction">Transaction</NavLinkStyled>
    </Nav>
  );
};

export default Navigation;
