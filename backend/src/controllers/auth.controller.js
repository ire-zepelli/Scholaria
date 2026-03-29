import { registerAuth, loginAuth } from "../services/auth.service.js";
import { addUser } from "../services/user.service.js";

export const register = async (req, res) => {
  try {
    const { email, password, ...userInfo } = req.body;
    const authId = await registerAuth(email, password);
    const user = await addUser(authId, userInfo);
    res.status(201).json({ message: "User registered successfully.", user });
  } catch (err) {
    console.error("Error registering user.", err);
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginAuth(email, password);
    res.status(200).json({ message: "Logged in successfully.", user });
  } catch (err) {
    console.error("Error logging in.", err);
    res.status(500).json({ error: err.message });
  }
};
