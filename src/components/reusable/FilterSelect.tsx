"use client"
import { createListCollection, Portal, Select } from '@chakra-ui/react'
import React from 'react'

interface Option {
    label: string
    value: string
}

interface FilterSelectProps {
    label: string
    placeholder: string
    options: Option[]
    selectedValue: string
    onChange: (value: string) => void
}

const FilterSelect: React.FC<FilterSelectProps> = ({ label, placeholder, options, selectedValue, onChange }) => {
  const collection = createListCollection<Option>({ items: options })
  return (
    <Select.Root<Option> 
      collection={collection} 
      size="sm"
      width="320px"
      onValueChange={(details) => {
        const newValue = details.value[0];
        if (newValue) {
          onChange(newValue);
        }
      }}
      value={[selectedValue]}
    >
        <Select.HiddenSelect />
        <Select.Label>{label}</Select.Label>
        <Select.Control>
            <Select.Trigger>
            <Select.ValueText placeholder={placeholder} />
            </Select.Trigger>
            <Select.IndicatorGroup>
            <Select.Indicator />
            </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
            <Select.Positioner>
                <Select.Content>
                {options.map((option) => (
                    <Select.Item key={option.value} item={option}>
                      {option.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                ))}
                </Select.Content>
            </Select.Positioner>
        </Portal>
    </Select.Root>
  )
}

export default FilterSelect