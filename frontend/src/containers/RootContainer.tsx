import { Breadcrumbs } from "components/Breadcrumbs";
import { Navbar } from "components/Navbar";
import { Container } from "react-bootstrap";

export interface RootContainerProps {
  children: JSX.Element | JSX.Element[];
}

export const RootContainer = ({ children }: RootContainerProps) => {
  return (
    <>
      <Navbar />
      <Container>
        <Breadcrumbs className="pt-3" />
      </Container>
      {children}
    </>
  );
};
