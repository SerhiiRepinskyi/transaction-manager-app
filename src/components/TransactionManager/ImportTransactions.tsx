import React from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Input } from "@chakra-ui/react";
import { parse } from "papaparse";
import { insertTransaction, fetchTransactions } from "../../db/db";
import { Transaction } from "../../types";

interface ImportFormData {
  csv: FileList;
}

interface ImportTransactionsProps {
  setTransactions: (transactions: Transaction[]) => void;
}

const ImportTransactions: React.FC<ImportTransactionsProps> = ({
  setTransactions,
}) => {
  const { register, handleSubmit, reset } = useForm<ImportFormData>();

  const importTransactions = (data: ImportFormData) => {
    if (data.csv && data.csv.length > 0) {
      const file = data.csv[0];
      parse<Transaction>(file, {
        header: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            alert("Помилка при імпорті файлу CSV. Перевірте формат файлу.");
          } else {
            results.data.forEach(insertTransaction);
            const updatedTransactions = fetchTransactions();
            setTransactions(updatedTransactions);
            reset();
          }
        },
        error: (err) => {
          console.error(err);
          alert("Помилка при імпорті файлу CSV. Перевірте формат файлу.");
        },
      });
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(importTransactions)}>
      <Input type="file" {...register("csv")} />
      <Button type="submit">Імпорт</Button>
    </Box>
  );
};

export default ImportTransactions;
