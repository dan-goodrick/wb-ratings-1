import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm.jsx";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const handleLogin = async (e, formData) => {
    e.preventDefault();
    const res = await axios.post("/api/auth", formData);
    const {success} = res.data
    console.log(res.data);
    if (success) {
      navigate(`/me`);
    } else {
      return <p>Try again</p>
    }

  };
 
  return (
    <>
      <h1>Log In</h1>
      <LoginForm onLogin={handleLogin} />
    </>
  );
}
