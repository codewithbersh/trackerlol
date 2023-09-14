"use client";

import { useState } from "react";
import { useDeleteCategoryStore } from "@/hooks/use-delete-category-store";
import { useEditExpenseStore } from "@/hooks/use-edit-expense-store";
import useCategoryData from "@/hooks/use-category-data";
import axios from "axios";
import toast from "react-hot-toast";

import { Modal } from "@/components/ui/modal";
import {
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const DeleteCategoryModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose } = useDeleteCategoryStore();
  const { category, onClose: onCloseEditExpense } = useEditExpenseStore();
  const { refetch } = useCategoryData();
  if (!category) return null;

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/categories/${category.id}`);
      toast.success("Category has been deleted.");
      refetch();
      onClose();
      onCloseEditExpense();
      setIsLoading(false);
    } catch (error) {
      toast.error("An error has occurred.");
      console.log("[DELETE_CATEGORY_ERROR]", error);
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <DialogHeader>
        <DialogTitle>Are you sure you want to continue?</DialogTitle>
        <DialogDescription>This action cannot be undone.</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={onClose} variant="outline" disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={handleDelete} disabled={isLoading}>
          Continue
        </Button>
      </DialogFooter>
    </Modal>
  );
};
