interface User {
  id: string;
  email: string;
  name?: string;
  password: string;
}

interface AuthResponse {
  user: User | null;
  error?: string;
}

// Simulated users database with passwords
const USERS: User[] = [
  { 
    id: '1', 
    email: 'demo@example.com', 
    name: 'Demo User',
    password: 'demo123'
  }
];

// Omit password when returning user data
const sanitizeUser = (user: User): Omit<User, 'password'> => {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
};

export const auth = {
  signIn: async (email: string, password: string): Promise<AuthResponse> => {
    const user = USERS.find(u => u.email === email);
    
    if (!user) {
      return { user: null, error: 'No account found with this email' };
    }

    if (user.password !== password) {
      return { user: null, error: 'Invalid password' };
    }

    const sanitizedUser = sanitizeUser(user);
    localStorage.setItem('user', JSON.stringify(sanitizedUser));
    return { user: sanitizedUser };
  },

  signUp: async (email: string, password: string, name?: string): Promise<AuthResponse> => {
    const exists = USERS.some(u => u.email === email);
    
    if (exists) {
      return { user: null, error: 'An account with this email already exists' };
    }

    if (!password || password.length < 6) {
      return { user: null, error: 'Password must be at least 6 characters long' };
    }

    const newUser: User = {
      id: String(USERS.length + 1),
      email,
      name,
      password
    };

    USERS.push(newUser);
    
    const sanitizedUser = sanitizeUser(newUser);
    localStorage.setItem('user', JSON.stringify(sanitizedUser));
    return { user: sanitizedUser };
  },

  signOut: async () => {
    localStorage.removeItem('user');
  },

  getUser: (): Omit<User, 'password'> | null => {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }
};