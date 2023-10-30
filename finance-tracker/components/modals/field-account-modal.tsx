"use client";

import { Dispatch, SetStateAction } from "react";
import { trpc } from "@/app/_trpc/client";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FieldAccountModal {
  deleteModalOpen: boolean;
  deleteModalOnClose: () => void;
  deleteModalOnChange: Dispatch<SetStateAction<boolean>>;
}

export const FieldAccountModal = ({
  deleteModalOpen,
  deleteModalOnClose,
  deleteModalOnChange,
}: FieldAccountModal) => {
  const { mutate: deleteAccount } = trpc.user.delete.useMutation();

  const handleDeleteAccount = async () => {
    deleteAccount(undefined, {
      onSuccess: () => {
        signOut({ callbackUrl: "/" });
        toast("Account deleted.");
      },
    });
  };

  return (
    <>
      <Dialog open={deleteModalOpen} onOpenChange={deleteModalOnChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete your account?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={deleteModalOnClose}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
