const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarios = [];

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, 'your_secret_key', { expiresIn: '1h' });
};

// Función para crear usuarios por defecto
const createDefaultUsers = async () => {
  const defaultUsers = [
    {id: 1, email: 'admin@example.com', password: 'admin123', role: 'ADMIN', telefono: '123456789',enabled: true },
    {id: 2, email: 'panadero@example.com', password: 'panadero123', role: 'PANADERO', telefono: '987654321',enabled: true },
    {id: 3, email: 'user@example.com', password: 'user123', role: 'USER', telefono: '456123789',enabled: true },
  ];

  for (const user of defaultUsers) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = {
      id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
      email: user.email,
      password: hashedPassword,
      role: user.role,
      telefono: user.telefono,
      enabled: true,
    };
    usuarios.push(newUser);
  }
};

// Llama a la función para crear usuarios por defecto al inicio
createDefaultUsers();

const getUsuarios = (req, res) => {
  res.json(usuarios);
};

const getUsuariosPaginado = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const paginatedUsers = usuarios.slice(start, end);
  const totalUsers = usuarios.length;

  res.json({
    usuarios: paginatedUsers,
    totalItems: totalUsers,
    currentPage: page,
    pageSize: pageSize,
    totalPages: Math.ceil(totalUsers / pageSize),
  });
};

const register = async (req, res) => {
  const { email, password, role, telefono } = req.body;

  const userExists = usuarios.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
  }


  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
    email,
    password: hashedPassword,
    role,
    telefono,
    enabled: true,
  };
  usuarios.push(newUser);
  res.status(201).json(newUser);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = usuarios.find(u => u.email === email);
  if (user) {
    if (!user.enabled) {
      return res.status(403).json({ message: 'User account is disabled' });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = generateToken(user);
      return res.json({ token, id: user.id, nombre: user.email, role: user.role, telefono: user.telefono });
    }
  }
  res.status(401).json({ message: 'Invalid credentials' });
};

const changePassword = async (req, res) => {
  const { id, oldPassword, newPassword } = req.body;
  const user = usuarios.find(u => u.id == id);
  console.log(user.email);
  if (user && await bcrypt.compare(oldPassword, user.password)) {
    user.password = await bcrypt.hash(newPassword, 10);
    res.json({ message: 'Password updated' });
  } else {
    res.status(400).json({ message: 'Invalid password' });
  }
};

const forgotPassword = (req, res) => {
  const { email } = req.body;
  const user = usuarios.find(u => u.email === email);
  if (user) {
    // Aquí podrías enviar un correo electrónico con un enlace para restablecer la contraseña
    res.json({ message: 'Password reset link sent' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const enableUser = (req, res) => {
  const { id } = req.body;
  const user = usuarios.find(u => u.id == id);
  if (user) {
    user.enabled = true;
    res.json({ message: 'User enabled' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const disableUser = (req, res) => {
  const { id } = req.body;
  const user = usuarios.find(u => u.id == id);
  if (user) {
    user.enabled = false;
    res.json({ message: 'User disabled' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const changeUserRole = (req, res) => {
  const { id, newRole } = req.body;
  const validRoles = ['ADMIN', 'PANADERO', 'USER'];
  if (!validRoles.includes(newRole)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  const user = usuarios.find(u => u.id == id);
  if (user) {
    user.role = newRole;
    res.json({ message: 'User role updated', user });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = {
  register,
  login,
  changePassword,
  forgotPassword,
  enableUser,
  disableUser,
  getUsuarios,
  getUsuariosPaginado,
  changeUserRole
};
