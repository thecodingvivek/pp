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
      console.log("Checking auth with URL:", `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/me`);
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/me`, {
        method: "GET",
        credentials: "include", // Important to send cookies
      });
      
      console.log("Auth response status:", res.status);
      const data = await res.json();
      console.log("Auth response data:", data);
      
      if (res.ok && data.success) {
        set({ user: data.user, isAuthenticated: true, isCheckingAuth: false });
        console.log("Auth successful, user:", data.user);
        return true;
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    }
    
    console.log("Auth failed, setting isAuthenticated to false");
    set({ user: null, isAuthenticated: false, isCheckingAuth: false });
    return false;
  },
  
  updateUser: (updates) => set((state) => ({
    user: { ...state.user, ...updates }
  })),
}));

export default useAuthStore;
