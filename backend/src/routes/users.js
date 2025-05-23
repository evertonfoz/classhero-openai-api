import express from 'express';
import { createSupabaseClient } from '../config/supabase_client.js';

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const supabase = createSupabaseClient();

    // Fetch users from the 'users' table.  Adjust the table name if needed.
    const { data: users, error } = await supabase
      .from('users') // Replace 'users' with your actual user table name
      .select('name, email, is_a_admin, is_a_teacher, is_a_student, is_validated') // Adjust the fields as needed
      .order('name', { ascending: true }); // Adjust the order as needed

    if (error) {
      console.error('Erro ao buscar usuários:', error.message);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }

    // If no users are found, return an empty array or a message
    if (!users || users.length === 0) {
      return res.status(200).json([]); // Or:  return res.status(404).json({ message: 'No users found' });
    }

    // Return the users data
    return res.json(users);
  } catch (error) {
    console.error('Erro inesperado:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
