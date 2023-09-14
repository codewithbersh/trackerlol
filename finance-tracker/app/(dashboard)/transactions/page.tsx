import { TransactionsClient } from "./client";

const TransactionsPage = async () => {
  return (
    <div className="h-screen grid place-items-center">
      <TransactionsClient />
    </div>
  );
};

export default TransactionsPage;
