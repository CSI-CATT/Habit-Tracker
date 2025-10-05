import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  Typography
} from '@mui/material'
import useHabit, { type HabitStates } from '../store/store'
import {
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon
} from '@mui/icons-material'

const HabitList = () => {
  const { habits, removeHabit, toggleHabitCompletion } = useHabit()
  const today = new Date().toISOString().split('T')[0]
  const getStreak = (habit: HabitStates) => {
    let streak = 0
    const currentDate = new Date()
    while (true) {
      const dateString = currentDate.toISOString().split('T')[0]
      if (habit.completedDate.includes(dateString)) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else {
        break
      }
    }
    return streak
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      {habits.map(habit => {
        const isCompletedToday = habit.completedDate.includes(today)

        return (
          <Paper
            key={habit.id}
            sx={{
              p: 2,
              backgroundColor: '#fff',
              transition: '0.2s',
              borderRadius: 2,
              '&:hover': { boxShadow: 6, transform: 'scale(1.01)' }
            }}
            elevation={3}
          >
            <Grid container spacing={2} alignItems='center'>
              {/* Habit details */}
              <Grid item xs={12} sm={6}>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                  {habit.name}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    color: 'text.secondary',
                    textTransform: 'capitalize'
                  }}
                >
                  {habit.frequency}
                </Typography>
              </Grid>

              {/* Buttons */}
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                  gap: 1
                }}
              >
                <Button
                  variant={isCompletedToday ? 'contained' : 'outlined'}
                  startIcon={<CheckCircleIcon />}
                  sx={{
                    textTransform: 'none',
                    borderRadius: 2,
                    fontWeight: 'bold',
                    px: 2,
                    py: 1,
                    ...(isCompletedToday
                      ? {
                          backgroundColor: '#4caf50 !important',
                          color: '#fff !important',
                          borderColor: '#4caf50 !important',
                          '&:hover': {
                            backgroundColor: '#43a047 !important'
                          }
                        }
                      : {
                          backgroundColor: '#fff !important',
                          color: '#1976d2 !important',
                          borderColor: '#1976d2 !important',
                          '&:hover': {
                            backgroundColor:
                              'rgba(25, 118, 210, 0.08) !important'
                          }
                        })
                  }}
                  onClick={() => toggleHabitCompletion(habit.id, today)}
                >
                  {isCompletedToday ? 'Completed' : 'Mark Complete'}
                </Button>

                <Button
                  variant='outlined'
                  color='error'
                  startIcon={<DeleteIcon />}
                  sx={{ textTransform: 'none', borderRadius: 2 }}
                  onClick={() => removeHabit(habit.id)}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: 'flex',
                mt: 2,
                flexDirection: 'column',
                gap: 2,
                p: 2,
                backgroundColor: '#f5f5f5'
              }}
            >
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                Current Streak : {getStreak(habit)}
              </Typography>
              <LinearProgress
                variant='determinate'
                value={(getStreak(habit) / 30) * 100}
              />
            </Box>
          </Paper>
        )
      })}
    </Box>
  )
}

export default HabitList
