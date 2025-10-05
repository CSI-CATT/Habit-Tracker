import {
  Box,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material'
import { useState } from 'react'
import useHabit from '../store/store'

export const HabitForm = () => {
  const [name, setName] = useState('')
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>(
    'daily'
  )
  const {habits , addHabit} = useHabit()
  console.log(habits);
  
  const handleSubmit = (e:React.FormEvent)=>{
    e.preventDefault()
    if(name.trim()){
      addHabit(name,frequency)
      setName('')
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label='Habit Name'
          value={name}
          onChange={e =>setName(e.target.value)}
          fullWidth
          placeholder='Enter Your Habit'
        />
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Age</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={frequency}
            label='Age'
            onChange={e =>
              setFrequency(e.target.value as 'daily' | 'weekly' | 'monthly')
            }
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" type='submit'>
          Add Habit
        </Button>
      </Box>
    </form>
  )
}
