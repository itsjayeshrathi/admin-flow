import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import { ForgotPassword } from "./components/ForgotPassword";
import { SignUp } from "./components/SignUp";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
