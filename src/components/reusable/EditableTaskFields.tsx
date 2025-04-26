'use client'

import { Editable, IconButton, Input, Textarea, VStack } from "@chakra-ui/react"
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu"

interface EditableTaskFieldsProps {
    title: string
    description: string
    category: string
    onChange?: (updated: Partial<{ title: string; description: string; category: string }>) => void;
}

const EditableTaskFields: React.FC<EditableTaskFieldsProps> = ({title, description, category, onChange}) => {
    const fields =[
        {
            label: 'title',
            value: title,
            inputType: Input,
            aria: 'title'
        },
        {
            label: 'description',
            value: description,
            inputType: Textarea,
            aria: 'description',
        },
        {
            label: 'category',
            value: category,
            inputType: Input,
            aria: 'category',
        },
    ]
    
    return (
        <VStack align="start">
            {fields.map((field) => {
                const handleSubmit = (
                e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                onChange?.({ [field.label]: e.target.value });
            };
        return (
            <Editable.Root
                key={field.label}
                defaultValue={field.value}
                onSubmit={(val) => onChange?.({ [field.label]: val })}
                borderBottom="2px solid #ccc"
                display="flex"
            >
                <Editable.Area textTransform="capitalize" fontWeight="bold">
                    {field.label}:
                </Editable.Area>
                <Editable.Preview />
                {field.label === 'category' ?(
                    <Editable.Input as="select" onBlur={handleSubmit} defaultValue={field.value}>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Others">Others</option>
                    </Editable.Input>
                ) : (
                    <Editable.Input as={field.inputType} onBlur={handleSubmit} />
                )}
                <Editable.Control>
                    <Editable.EditTrigger asChild>
                    <IconButton variant="ghost" size="xs" aria-label={`Edit ${field.aria}`}>
                        <LuPencilLine />
                    </IconButton>
                    </Editable.EditTrigger>
                    <Editable.CancelTrigger asChild>
                    <IconButton variant="outline" size="xs" aria-label={`Cancel edit ${field.aria}`}>
                        <LuX />
                    </IconButton>
                    </Editable.CancelTrigger>
                    <Editable.SubmitTrigger asChild>
                    <IconButton variant="outline" size="xs" aria-label={`Submit ${field.aria}`}>
                        <LuCheck />
                    </IconButton>
                    </Editable.SubmitTrigger>
                </Editable.Control>
            </Editable.Root>
            )})}
        </VStack>
    )
}

export default EditableTaskFields