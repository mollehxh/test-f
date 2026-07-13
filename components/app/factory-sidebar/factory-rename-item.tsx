import type * as React from "react";

import { SidebarInput, SidebarMenuItem } from "@/components/ui/sidebar";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onCommit: () => void;
  onCancel: () => void;
};

export function FactoryRenameItem(props: Props) {
  const { value, onChange, onCommit, onCancel } = props;

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.currentTarget.select();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing || event.keyCode === 229) {
      return;
    }

    if (event.key === "Enter") {
      onCommit();
    }

    if (event.key === "Escape") {
      event.preventDefault();
      onCancel();
    }
  };

  return (
    <SidebarMenuItem>
      <SidebarInput
        autoFocus
        value={value}
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={onCommit}
        onKeyDown={handleKeyDown}
        aria-label="Название завода"
        className="h-8"
      />
    </SidebarMenuItem>
  );
}
