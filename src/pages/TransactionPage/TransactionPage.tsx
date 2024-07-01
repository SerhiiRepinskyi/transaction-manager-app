import TransactionManager from "../../components/TransactionManager";
import { Container } from "./TransactionPage.styled";

const TransactionPage = () => {
  return (
    <section>
      <Container>
        <TransactionManager />
      </Container>
    </section>
  );
};

export default TransactionPage;
