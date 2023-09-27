"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";
import { BaseSyntheticEvent } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";

interface FieldImageUploadProps {
  endpoint: "receiptImage";
  value: string;
  onChange: (value?: string) => void;
  triggerSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
}

export const FieldImageUpload = ({
  endpoint,
  value,
  onChange,
  triggerSubmit,
}: FieldImageUploadProps) => {
  if (value) {
    return (
      <div className="relative">
        <div className="w-full overflow-y-auto aspect-[4/3] rounded-md relative group">
          <Image src={value} alt="" width={1024} height={1024} sizes="50vw" />
        </div>
        <Button
          className="absolute -right-2 -top-2 p-0 w-6 h-6"
          variant="default"
          onClick={() => onChange("")}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
        triggerSubmit();
      }}
      onUploadError={(error: Error) => {
        toast.error("Error. Please check the file size.");
        console.log(error);
      }}
      appearance={{
        label: "text-primary",
        uploadIcon: "w-12 h-12 text-muted-foreground",
        container: "max-h-[250px] px-8 py-4 rounded-2xl w-full  mx-auto",
        button: "bg-primary px-4 py-2 rounded-full leading-none ",
        allowedContent: "mb-4",
      }}
    />
  );
};
