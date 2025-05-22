// context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, useSegments } from "expo-router";
import { AuthService } from "../services/AuthService"; // Assuming AuthService is in services folder

interface User {
  id: string;
  email: string;
  // Add other user properties if needed
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      try {
        // In a real app, you'd check a stored token or session
        // For now, we simulate no persistent session, so user starts as null
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
      } catch (e) {
        console.error("Failed to fetch user:", e);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    if (isLoading) return; // Don't redirect until loading is done

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      // Redirect to login if user is not signed in and not in auth group
      router.replace("/(auth)/LoginScreen");
    } else if (user && inAuthGroup) {
      // Redirect to home if user is signed in and in auth group (e.g., after login)
      router.replace("/(home)"); // Or your main app screen
    }
  }, [user, segments, isLoading, router]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const loggedInUser = await AuthService.login(email, password);
    setUser(loggedInUser);
    setIsLoading(false);
    if (loggedInUser) {
      router.replace("/(home)"); // Or your main app screen
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    const registeredUser = await AuthService.register(email, password);
    // No need to setUser here as AuthService.register doesn't log in the user directly in this sim
    setIsLoading(false);
    if (registeredUser) {
      // Typically, after registration, you'd navigate to login or show a success message
      // router.replace('/(auth)/LoginScreen'); // Navigate to login after registration
      return true;
    }
    return false;
  };

  const logout = async () => {
    setIsLoading(true);
    await AuthService.logout();
    setUser(null);
    setIsLoading(false);
    router.replace("/(auth)/LoginScreen");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
