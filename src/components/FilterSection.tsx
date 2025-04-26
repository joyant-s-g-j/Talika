import { Box, Input, Text } from '@chakra-ui/react'
import React from 'react'
import FilterSelect from './reusable/FilterSelect'

type Props = {
    selectedCategory: string
    setSelectedCategory: (value: string) => void
    selectedStatus: string;
    setSelectedStatus: (value: string) => void;
    search: string;
    setSearch: (value: string) => void;
}

const categoryOptions = [
    { label: 'All', value: '' },
    { label: 'Work', value: 'Work' },
    { label: 'Personal', value: 'Personal' },
    { label: 'Other', value: 'Other' },
];

const statusOptions = [
    { label: 'All', value: '' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Completed', value: 'Completed' },
];
  

const FilterSection = ({selectedCategory, setSelectedCategory, selectedStatus, setSelectedStatus, search, setSearch}: Props) => {
  return (
    <Box display="flex" flexDirection={{base: "column", lg: "row"}} gap={2}>
        <FilterSelect 
            label='Select Category'
            placeholder='Category'
            options={categoryOptions}
            selectedValue={selectedCategory}
            onChange={setSelectedCategory}
        />
        <FilterSelect 
            label='Select Status'
            placeholder='Status'
            options={statusOptions}
            selectedValue={selectedStatus}
            onChange={setSelectedStatus}
        />
        <Box display="flex" flexDirection="column">
        <Text>Search</Text>
        <Input
            placeholder='Search by task name'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            width="320px"
            size="sm"
        />
        </Box>
    </Box>
  )
}

export default FilterSection