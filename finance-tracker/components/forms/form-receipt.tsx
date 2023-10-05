"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useReceiptModal } from "@/hooks/use-receipt-modal";
import { useRouter } from "next/navigation";
import useTransactionsData from "@/hooks/use-transactions-data";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { FieldImageUpload } from "./field-image-upload";
import { FieldTransactions } from "./field-transactions";

const formSchema = z.object({
  imageUrl: z.string().min(1),
  transactionId: z.string().optional().nullable(),
});

export const FormReceipt = () => {
  const { onClose, receipt: initialData, setReceipt } = useReceiptModal();
  const { data: transactions } = useTransactionsData();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const toastSuccess = initialData ? "Receipt Updated." : "Receipt Uploaded.";
  const buttonText = initialData ? "Save Changes" : "Add Receipt";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        await axios.patch(`/api/receipts/${initialData.id}`, {
          ...values,
          oldImageUrl: initialData.imageUrl,
        });
        onClose();
      } else {
        const res = await axios.post("/api/receipts", values);
        setReceipt(res.data);
      }

      toast.success(toastSuccess);
      router.refresh();
    } catch (error) {
      toast.error("An error has occured.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/receipts/${id}`);
      toast.success("Receipt deleted.");
      router.refresh();
      onClose();
    } catch (error) {
      console.log("[DELETE_RECEIPT_ERROR]", error);
      toast.error("An error has occured.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Receipt</FormLabel>
              <FormControl>
                <FieldImageUpload
                  endpoint="receiptImage"
                  value={field.value}
                  onChange={field.onChange}
                  triggerSubmit={form.handleSubmit(onSubmit)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="transactionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction</FormLabel>
              <FormControl>
                <FieldTransactions
                  transactions={transactions}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex w-full gap-4">
          {initialData && (
            <Button
              variant="outline-destructive"
              type="button"
              onClick={() => handleDelete(initialData.id)}
              disabled={isLoading}
            >
              Delete
            </Button>
          )}
          <Button
            variant="ghost"
            className="ml-auto"
            type="button"
            onClick={onClose}
            disabled={isLoading}
          >
            Close
          </Button>
          <Button className="gap-2" disabled={isLoading}>
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
};
