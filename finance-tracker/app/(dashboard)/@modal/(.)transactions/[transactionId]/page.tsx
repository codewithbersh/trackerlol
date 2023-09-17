import { Dialog, InterceptedDialogContent } from "@/components/ui/dialog";

interface TransactionIdModalProps {
  params: { transactionId: string };
}

const TransactionIdModal = async ({
  params: { transactionId },
}: TransactionIdModalProps) => {
  return (
    <Dialog open>
      <InterceptedDialogContent>{transactionId}</InterceptedDialogContent>
    </Dialog>
  );
};

export default TransactionIdModal;
