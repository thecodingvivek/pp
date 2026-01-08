import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  
  login: (userData) => set({ 
    user: userData, 
    isAuthenticated: true 
  }),
  
  logout: () => set({ 
    user: null, 
    isAuthenticated: false 
  }),

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/me`, {
        method: "GET",
        credentials: "include", // Important to send cookies
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        set({ user: data.user, isAuthenticated: true, isCheckingAuth: false });
        console.log("hell yeah")
        return true;
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    }
    
    set({ user: null, isAuthenticated: false, isCheckingAuth: false });
    return false;
  },
  
  updateUser: (updates) => set((state) => ({
    user: { ...state.user, ...updates }
  })),
}));

export default useAuthStore;
