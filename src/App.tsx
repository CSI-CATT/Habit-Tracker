import { Container, Typography ,Box} from "@mui/material";
import useHabit from "./store/store"
import { HabitForm } from "./Components/HabitForm";
import HabitList from "./Components/HabitList";

const App = () => {
   const store = useHabit()
   console.log(store);
   
  return (
    <Container>
      <Box>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Habit Tracker
        </Typography>
        {/* forms */}
        <HabitForm/>
        {/* lists */}
        <HabitList/>
        {/* stats */}
      </Box>
    </Container>
  )
}

export default App