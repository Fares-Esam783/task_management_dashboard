import { User, LoginCredentials, RegisterCredentials } from "@/types/auth";

const USERS_KEY = "task_dashboard_users";
const CURRENT_USER_KEY = "task_dashboard_current_user";

interface StoredUser {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: string;
}

// Get all users from localStorage
const getUsers = (): StoredUser[] => {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
};

// Save users to localStorage
const saveUsers = (users: StoredUser[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Generate a simple token (in production, use JWT)
const generateToken = (userId: string): string => {
  return btoa(`${userId}:${Date.now()}`);
};

// Mock login function
export const mockLogin = async (
  credentials: LoginCredentials
): Promise<{ user: User; token: string }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const users = getUsers();
  const user = users.find(
    (u) => u.email === credentials.email && u.password === credentials.password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user.id);
  const userWithoutPassword: User = {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
  };

  // Store current user
  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify({ user: userWithoutPassword, token })
  );

  return { user: userWithoutPassword, token };
};

// Mock register function
export const mockRegister = async (
  credentials: RegisterCredentials
): Promise<{ user: User; token: string }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const users = getUsers();

  // Check if user already exists
  if (users.find((u) => u.email === credentials.email)) {
    throw new Error("User with this email already exists");
  }

  // Create new user
  const newUser: StoredUser = {
    id: `user_${Date.now()}`,
    email: credentials.email,
    name: credentials.name,
    password: credentials.password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  const token = generateToken(newUser.id);
  const userWithoutPassword: User = {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    createdAt: newUser.createdAt,
  };

  // Store current user
  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify({ user: userWithoutPassword, token })
  );

  return { user: userWithoutPassword, token };
};

// Get current user from localStorage
export const getCurrentUser = (): { user: User; token: string } | null => {
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

// Logout
export const mockLogout = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Validate token (simple check)
export const validateToken = (token: string): boolean => {
  try {
    const decoded = atob(token);
    return decoded.includes(":");
  } catch {
    return false;
  }
};
