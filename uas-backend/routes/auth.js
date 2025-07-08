const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM public.users WHERE username = $1 AND password = $2',
      [username, password]
    );

    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Login berhasil', user: result.rows[0] });
    } else {
      res.json({ success: false, message: 'Username atau password salah' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
  }
});

router.post('/auth/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username dan password harus diisi' });
  }

  try {
    // Check if username already exists
    const userCheck = await pool.query('SELECT * FROM public.users WHERE username = $1', [username]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Username sudah digunakan' });
    }

    // Insert new user
    await pool.query('INSERT INTO public.users (username, password) VALUES ($1, $2)', [username, password]);

    res.json({ success: true, message: 'Registrasi berhasil' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server saat registrasi' });
  }
});

module.exports = router;
