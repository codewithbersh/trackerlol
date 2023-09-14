"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, PlusCircle, Trash, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import useCategoryData from "@/hooks/use-category-data";
import { useCategoryModal } from "@/hooks/use-category-modal";

const FormSchema = z.object({
  category: z.string({
    required_error: "Please select a category.",
  }),
});

export const ExpenseForm = () => {
  const { onOpen } = useCategoryModal();
  const { data: categories, refetch, isLoading } = useCategoryData();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
  }

  return (
    <div>
      {categories && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full"
          >
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Category</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[300px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? categories.find(
                                (category) => category.id === field.value
                              )?.title
                            : "Select a category"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandList>
                          <CommandInput placeholder="Search categories..." />
                          <CommandEmpty>No category found.</CommandEmpty>

                          <CommandGroup>
                            {categories.map((category) => (
                              <CommandItem
                                value={category.title}
                                key={category.id}
                                onSelect={() => {
                                  form.setValue("category", category.id);
                                }}
                                className="mt-2"
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    category.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                <div className="flex gap-2 items-center w-full">
                                  <span
                                    className="text-xl p-1 rounded-md leading-none"
                                    style={{ backgroundColor: category.color }}
                                  >
                                    {category.emoji}
                                  </span>
                                  <span className="leading-none">
                                    {category.title}
                                  </span>
                                  <Button
                                    className="ml-auto h-6 w-6"
                                    size="icon"
                                    variant="ghost"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                        <CommandSeparator />
                        <CommandList>
                          <CommandGroup>
                            <CommandItem onSelect={onOpen} className="px-4">
                              <PlusCircle className="w-4 h-4 mr-2" />
                              New Category
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )}
    </div>
  );
};
