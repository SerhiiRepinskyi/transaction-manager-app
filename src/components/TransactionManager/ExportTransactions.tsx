import React from "react";
import { Button } from "@chakra-ui/react";
import { unparse } from "papaparse";
import { saveAs } from "file-saver";
import { Transaction } from "../../types";

interface ExportTransactionsProps {
  transactions: Transaction[];
}

const ExportTransactions: React.FC<ExportTransactionsProps> = ({
  transactions,
}) => {
  const exportTransactions = () => {
    const csv = transactions.map((t) => ({
      TransactionId: t.TransactionId,
      Status: t.Status,
      Type: t.Type,
      ClientName: t.ClientName,
      Amount: t.Amount,
    }));
    const csvString = unparse(csv);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "transactions.csv");
  };

  return <Button onClick={exportTransactions}>Export</Button>;
};

export default ExportTransactions;
