import { useState } from "react";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

interface ConfirmOptions {
  title: string;
  description: string;
  onConfirm: () => void | Promise<void>;
}

export const useConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const openConfirm = (confirmOptions: ConfirmOptions) => {
    setOptions(confirmOptions);
    setIsOpen(true);
  };

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await options?.onConfirm();
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const ConfirmDialog = () => (
    <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>{options?.title}</AlertDialog.Title>
        <AlertDialog.Description size="2">
          {options?.description}
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Não
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red" onClick={handleConfirm} disabled={isLoading}>
              {isLoading ? "Excluindo..." : "Sim"}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );

  return { openConfirm, ConfirmDialog };
};
