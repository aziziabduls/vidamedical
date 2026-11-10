'use client';

import { useId, type ReactNode } from 'react';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export interface SelectOptionItem {
  label: string;
  value: string | null;
}

const items = [
  { label: 'Fruits', value: null },
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Grapes', value: 'grapes' },
  { label: 'Pineapple', value: 'pineapple' },
] satisfies SelectOptionItem[];

export interface SelectDemoProps {
  label?: string;
  groupLabel?: string;
  items?: readonly SelectOptionItem[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  startIcon?: ReactNode;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

const SelectDemo = ({
  label = 'Default select',
  groupLabel,
  items: customItems,
  value,
  defaultValue,
  onValueChange,
  startIcon,
  name,
  required,
  disabled,
  className,
  labelClassName,
  triggerClassName,
  contentClassName,
}: SelectDemoProps) => {
  const id = useId();
  const resolvedItems = customItems ?? items;
  const placeholderItem = resolvedItems.find((item) => item.value === null);
  const selectableItems = resolvedItems.filter(
    (item): item is { label: string; value: string } => item.value !== null
  );
  const resolvedGroupLabel = groupLabel ?? placeholderItem?.label ?? (customItems ? undefined : 'Fruits');

  const resolvedDefaultValue = defaultValue ?? (customItems ? (selectableItems[0]?.value ?? null) : 'apple');

  return (
    <div className={cn('w-full max-w-xs space-y-2', className)}>
      <Label htmlFor={id} className={labelClassName}>
        {label}
      </Label>
      <Select<string>
        items={resolvedItems as SelectOptionItem[]}
        name={name}
        required={required}
        disabled={disabled}
        {...(value !== undefined ? { value } : { defaultValue: resolvedDefaultValue })}
        onValueChange={(nextValue) => onValueChange?.(nextValue ?? null)}
      >
        <SelectTrigger id={id} className={cn('w-full', triggerClassName)}>
          {startIcon && (
            <span className="pointer-events-none shrink-0" aria-hidden="true">
              {startIcon}
            </span>
          )}
          <SelectValue />
        </SelectTrigger>
        <SelectContent className={contentClassName}>
          <SelectGroup>
            {resolvedGroupLabel && <SelectLabel>{resolvedGroupLabel}</SelectLabel>}
            {selectableItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectDemo;
