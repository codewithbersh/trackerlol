"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useReceiptModal } from "@/hooks/use-receipt-modal";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { FieldImageUpload } from "./field-image-upload";

const formSchema = z.object({
  imageUrl: z.string().min(1),
  title: z.string(),
});

export const FormReceipt = () => {
  const { onClose, receipt: initialData, setReceipt } = useReceiptModal();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      imageUrl: "",
      title: "",
    },
  });

  const toastSuccess = initialData ? "Receipt Updated." : "Receipt Uploaded.";
  const buttonText = initialData ? "Save Changes" : "Add Receipt";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("submit");
    try {
      if (initialData) {
        await axios.patch(`/api/receipts/${initialData.id}`, {
          ...values,
          oldImageUrl: initialData.imageUrl,
        });
      } else {
        await axios.post("/api/receipts", values);
      }
      toast.success(toastSuccess);
      router.refresh();
      onClose();
    } catch (error) {
      await axios.delete(
        `/api/uploadthing/${values.imageUrl.replace("https://utfs.io/f/", "")}`,
      );
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Receipt title" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
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
        <div className="flex w-full gap-4">
          {initialData && (
            <Button
              variant="outline-destructive"
              type="button"
              onClick={() => handleDelete(initialData.id)}
            >
              Delete
            </Button>
          )}
          <Button
            variant="ghost"
            className="ml-auto"
            type="button"
            onClick={onClose}
          >
            Close
          </Button>
          <Button>{buttonText}</Button>
        </div>
      </form>
    </Form>
  );
};
