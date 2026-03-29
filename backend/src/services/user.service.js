import { query } from "../db.js";

export const getAllUsers = async () => {
  const { rows } = await query("SELECT * FROM users");
  return rows;
};

export const addUser = async (
  authId,
  {
    firstName,
    lastName,
    educationLevel,
    program,
    yearLevel,
    school,
    gpa,
    familyIncome,
    city,
    nationality,
    phone,
  },
) => {
  const { rows } = await query(
    `INSERT INTO users 
      (auth_id, first_name, last_name, education_level, program, year_level, school, gpa, family_income, city, nationality, phone) 
     VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
     RETURNING *`,
    [
      authId,
      firstName,
      lastName,
      educationLevel,
      program,
      yearLevel,
      school,
      gpa,
      familyIncome,
      city,
      nationality,
      phone,
    ],
  );
  return rows[0];
};
