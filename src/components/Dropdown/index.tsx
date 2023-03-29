import {
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";

interface DropdownProps {
  onChange: (e: number) => void;
  value: number;
  title: string;
  options: { value: number; title: string }[];
}

export const Dropdown = ({
  value,
  title,
  onChange,
  options,
}: DropdownProps) => {
  const [isOpen, setOpen] = useState(false);
  const displayValue = useMemo(
    () => options.filter((item) => item.value === value)[0],
    [options, value]
  );
  const setValue = (selected: number) => {
    onChange(selected);
    setOpen(false);
  };
  return (
    <Box>
      <Popover isOpen={isOpen} onClose={() => setOpen(false)}>
        <PopoverTrigger>
          <Button
            sx={{ color: "white", fontWeight: "bold" }}
            onClick={() => setOpen(true)}
          >
            {displayValue.title}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          minH="150px"
          minW="150px"
          background="white"
          border="2px solid"
          borderRadius="16px"
          display="flex"
          py={2}
        >
          <Box pl={4} pb={2} color="#6A6A6A">
            {title}
          </Box>
          {options?.map((item) => (
            <Button
              key={item.value}
              pl={6}
              py={1}
              width="100%"
              justifyContent="flex-start"
              sx={{
                ":hover": {
                  background: "#2c58b8",
                  color: "white",
                },
              }}
              onClick={() => setValue(item.value)}
            >
              {item.title}
            </Button>
          ))}
        </PopoverContent>
      </Popover>
    </Box>
  );
};
