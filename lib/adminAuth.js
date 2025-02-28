// Simple admin authentication for ClipperCuts
// This is a basic implementation that can be enhanced later

// Admin credentials - in production, these should be stored securely
// and not hardcoded in the source code
const ADMIN_EMAIL = 'admin@clippercuts.com';
const ADMIN_PASSWORD = 'admin123';

// Store session in localStorage and cookies
const SESSION_KEY = 'admin_session';

// Helper function to set a cookie
const setCookie = (name, value, days) => {
  if (typeof document === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

// Helper function to delete a cookie
const deleteCookie = (name) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Strict`;
};

// Login function
export const adminLogin = (email, password) => {
  // Simple validation
  if (!email || !password) {
    return { success: false, message: 'Email and password are required' };
  }
  
  try {
    // Check credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Create session
      const session = {
        email,
        isAdmin: true,
        loginTime: new Date().toISOString(),
        // In a real app, you would generate a secure token here
        token: `admin_${Math.random().toString(36).substring(2)}`,
      };
      
      // Store in localStorage (client-side only)
      if (typeof window !== 'undefined') {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        
        // Also set a cookie for middleware authentication
        setCookie(SESSION_KEY, 'true', 1); // Expires in 1 day
      }
      
      return { success: true, session };
    }
    
    return { success: false, message: 'Invalid email or password' };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'An unexpected error occurred during login' };
  }
};

// Check if user is logged in
export const checkAdminSession = () => {
  if (typeof window === 'undefined') {
    return { isLoggedIn: false };
  }
  
  try {
    const sessionData = localStorage.getItem(SESSION_KEY);
    if (!sessionData) {
      return { isLoggedIn: false };
    }
    
    const session = JSON.parse(sessionData);
    return { isLoggedIn: true, session };
  } catch (error) {
    console.error('Session check error:', error);
    // If there's an error, clear the corrupted session data
    localStorage.removeItem(SESSION_KEY);
    deleteCookie(SESSION_KEY);
    return { isLoggedIn: false, error };
  }
};

// Logout function
export const adminLogout = () => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(SESSION_KEY);
      deleteCookie(SESSION_KEY);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, message: 'Error during logout' };
    }
  }
  return { success: true };
};
