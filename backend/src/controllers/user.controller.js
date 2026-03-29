import * as userService from "../services/user.service.js";

export const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users.", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { authId, ...userInfo } = req.body;
    const user = await addUser(authId, userInfo);
    res.status(201).json(user);
  } catch (err) {
    console.error("Error creating user.", err);
    res.status(500).json({ error: err.message });
  }
};


