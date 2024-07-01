import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  initializeDatabase,
  fetchTransactions,
  deleteTransaction as deleteDbTransaction,
  updateTransaction as updateDbTransaction,
} from "../../db/db";
import { Transaction } from "../../types";
import ImportTransactions from "./ImportTransactions";
import ExportTransactions from "./ExportTransactions";
import EditTransactionModal from "./EditTransactionModal";
import ReactPaginate from "react-paginate";
import { PaginationContainer } from "./PaginationStyled.styled";
import TransactionFilters from "./TransactionFilters";

const TransactionManager: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [transactionTypeFilter, setTransactionTypeFilter] =
    useState<string>("all");
  const [transactionStatusFilter, setTransactionStatusFilter] =
    useState<string>("all");

  useEffect(() => {
    const initDb = async () => {
      await initializeDatabase();
      const initialTransactions = fetchTransactions();
      setTransactions(initialTransactions);
    };
    initDb();
  }, []);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleDeleteTransaction = (transactionId: string) => {
    setSelectedTransaction(
      transactions.find((t) => t.TransactionId === transactionId) || null
    );
    onDeleteModalOpen();
  };

  const confirmDeleteTransaction = () => {
    if (selectedTransaction) {
      deleteDbTransaction(selectedTransaction.TransactionId);
      const updatedTransactions = fetchTransactions();
      setTransactions(updatedTransactions);
    }
    onDeleteModalClose();
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    onEditModalOpen();
  };

  const handleSaveTransaction = (transaction: Transaction) => {
    updateDbTransaction(transaction);
    const updatedTransactions = fetchTransactions();
    setTransactions(updatedTransactions);
    onEditModalClose();
  };

  const handleTransactionTypeFilterChange = (value: string) => {
    setTransactionTypeFilter(value);
    setCurrentPage(0); // Reset to first page when filter changes
  };

  const handleTransactionStatusFilterChange = (value: string) => {
    setTransactionStatusFilter(value);
    setCurrentPage(0); // Reset to first page when filter changes
  };

  // Apply filters
  const filteredTransactions = transactions
    .filter((transaction) => {
      if (transactionTypeFilter !== "all") {
        return transaction.Type === transactionTypeFilter;
      }
      return true;
    })
    .filter((transaction) => {
      if (transactionStatusFilter !== "all") {
        return transaction.Status === transactionStatusFilter;
      }
      return true;
    });

  const paginatedTransactions = filteredTransactions.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(filteredTransactions.length / itemsPerPage);

  return (
    <Box>
      <ImportTransactions setTransactions={setTransactions} />
      <ExportTransactions transactions={transactions} />

      <TransactionFilters
        transactionTypeFilter={transactionTypeFilter}
        transactionStatusFilter={transactionStatusFilter}
        onTransactionTypeFilterChange={handleTransactionTypeFilterChange}
        onTransactionStatusFilterChange={handleTransactionStatusFilterChange}
      />

      <Table variant="striped">
        <Thead bg="gray.200">
          <Tr>
            <Th>Id</Th>
            <Th>Status</Th>
            <Th>Type</Th>
            <Th>Client name</Th>
            <Th>Amount</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedTransactions.map((transaction, index) => (
            <Tr
              key={transaction.TransactionId}
              bg={index % 2 === 0 ? "gray.100" : "white"}
            >
              <Td>{transaction.TransactionId}</Td>
              <Td>{transaction.Status}</Td>
              <Td>{transaction.Type}</Td>
              <Td>{transaction.ClientName}</Td>
              <Td>{transaction.Amount}</Td>
              <Td>
                <Button
                  colorScheme="blue"
                  onClick={() => handleEditTransaction(transaction)}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() =>
                    handleDeleteTransaction(transaction.TransactionId)
                  }
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {transactions.length > 0 && (
        <PaginationContainer>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"pagination-item"}
            pageLinkClassName={"pagination-item"}
            previousClassName={"pagination-previous-next"}
            previousLinkClassName={"pagination-previous-next"}
            nextClassName={"pagination-previous-next"}
            nextLinkClassName={"pagination-previous-next"}
            breakClassName={"pagination-break"}
            breakLinkClassName={"pagination-break"}
            activeClassName={"active"}
          />
        </PaginationContainer>
      )}

      <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this transaction?
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={confirmDeleteTransaction}
            >
              Delete
            </Button>
            <Button onClick={onDeleteModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {selectedTransaction && (
        <EditTransactionModal
          isOpen={isEditModalOpen}
          onClose={onEditModalClose}
          transaction={selectedTransaction}
          saveTransaction={handleSaveTransaction}
        />
      )}
    </Box>
  );
};

export default TransactionManager;
