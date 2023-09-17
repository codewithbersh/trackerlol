interface TransactionIdPageProps {
  params: { transactionId: string };
}

const TransactionIdPage = ({
  params: { transactionId },
}: TransactionIdPageProps) => {
  return <div>transaction id: {transactionId}</div>;
};

export default TransactionIdPage;
