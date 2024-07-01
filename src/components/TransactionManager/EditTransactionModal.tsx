import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";
import { Transaction } from "../../types";

interface EditTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
  saveTransaction: (transaction: Transaction) => void;
}

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({
  isOpen,
  onClose,
  transaction,
  saveTransaction,
}) => {
  const [editTransaction, setEditTransaction] =
    useState<Transaction>(transaction);
  const [validStatus, setValidStatus] = useState<boolean>(true);

  useEffect(() => {
    setEditTransaction(transaction);
  }, [transaction]);

  const handleSave = () => {
    if (isValidStatus(editTransaction.Status)) {
      saveTransaction(editTransaction);
      onClose();
    } else {
      setValidStatus(false);
    }
  };

  const isValidStatus = (status: string) => {
    return ["Pending", "Completed", "Cancelled"].includes(status);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            value={editTransaction.Status}
            onChange={(e) => {
              setEditTransaction({
                ...editTransaction,
                Status: e.target.value,
              });
              setValidStatus(true);
            }}
            isInvalid={!validStatus}
          />
        </ModalBody>
        <ModalFooter>
          {!validStatus && (
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => setValidStatus(true)}
            >
              Close
            </Button>
          )}
          <Button onClick={handleSave}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditTransactionModal;
