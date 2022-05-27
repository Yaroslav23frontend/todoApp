import AppRouter from "./components/Forms/AppRouter";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
