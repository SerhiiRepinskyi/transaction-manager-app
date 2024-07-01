import React from "react";
import { Box, Select } from "@chakra-ui/react";

interface TransactionFiltersProps {
  transactionTypeFilter: string;
  transactionStatusFilter: string;
  onTransactionTypeFilterChange: (value: string) => void;
  onTransactionStatusFilterChange: (value: string) => void;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  transactionTypeFilter,
  transactionStatusFilter,
  onTransactionTypeFilterChange,
  onTransactionStatusFilterChange,
}) => {
  return (
    <Box mb={4}>
      <Select
        placeholder="Select transaction type"
        onChange={(e) => onTransactionTypeFilterChange(e.target.value)}
        value={transactionTypeFilter}
        mr={4}
      >
        <option value="all">All</option>
        <option value="Refill">Refill</option>
        <option value="Withdrawal">Withdrawal</option>
      </Select>
      <Select
        placeholder="Select transaction status"
        onChange={(e) => onTransactionStatusFilterChange(e.target.value)}
        value={transactionStatusFilter}
      >
        <option value="all">All</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </Select>
    </Box>
  );
};

export default TransactionFilters;
