"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { FieldAccountModal } from "@/components/modals/field-account-modal";

export const FieldAccountOptions = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  return (
    <>
      <div className="flex gap-4">
        <Button
          variant="destructive"
          onClick={() => setDeleteModalOpen(true)}
          type="button"
        >
          Delete Account
        </Button>
      </div>

      <FieldAccountModal
        deleteModalOpen={deleteModalOpen}
        deleteModalOnClose={() => setDeleteModalOpen(false)}
        deleteModalOnChange={setDeleteModalOpen}
      />
    </>
  );
};
