import { FC } from "react";
import Navigation from "../Navigation";
import { Header, ContainerHeader, LinkStyled } from "./AppBar.styled";

const AppBar: FC = () => {
  return (
    <Header>
      <ContainerHeader>
        <Navigation />

        <LinkStyled to="/">Home</LinkStyled>
      </ContainerHeader>
    </Header>
  );
};

export default AppBar;
