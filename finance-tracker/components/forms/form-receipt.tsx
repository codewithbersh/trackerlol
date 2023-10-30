"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast from "react-hot-toast";
import { useReceiptModal } from "@/hooks/use-receipt-modal";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { trpc } from "@/app/_trpc/client";

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
  const utils = trpc.useUtils();

  const { data: transactions } = trpc.transaction.getAll.useQuery(
    {},
    {
      staleTime: Infinity,
    },
  );
  const { mutate: addReceipt } = trpc.receipt.add.useMutation();
  const { mutate: updateReceipt } = trpc.receipt.update.useMutation();
  const { mutate: deleteReceipt } = trpc.receipt.delete.useMutation();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const buttonText = initialData ? "Save Changes" : "Add Receipt";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (initialData) {
      updateReceipt(
        { ...values, id: initialData.id },
        {
          onSuccess: ({ code, message }) => {
            if (code === 200) {
              utils.receipt.get.all.invalidate();
              onClose();
              toast.success(message);
            } else {
              toast.error(message);
            }
          },
        },
      );
    } else {
      addReceipt(values, {
        onSuccess: ({ code, message, receipt }) => {
          if (code === 200) {
            utils.receipt.get.all.invalidate();
            toast.success(message);
            setReceipt(receipt);
          } else {
            toast.error(message);
          }
        },
      });
    }
  };

  const handleDelete = async (id: string) => {
    deleteReceipt(
      { id },
      {
        onSuccess: ({ code, message }) => {
          if (code === 200) {
            toast.success(message);
            utils.receipt.get.all.invalidate();
            onClose();
          } else {
            toast.error(message);
          }
        },
      },
    );
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
