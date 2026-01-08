"use client";

import React from "react";
import { motion } from "framer-motion";
import TopGraphic from "../../../components/TopGraphic";
import GoogleIcon from "../../../components/GoogleIcon";

export default function LoginPage() {
  return (
    <div className="h-screen w-full bg-app-bg relative">
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-[35vh] min-h-62.5 shrink-0 flex items-end p-4 relative">
            <TopGraphic />
        </div>
        
        <div className="stepcont w-full flex-1 bg-[#F0F0F2] flex flex-col items-center pt-12 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md px-6 text-center"
          >
            <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign in</h2>
                <button 
                    type="button"
                    onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`}
                    className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 p-2.5 rounded-xl hover:bg-gray-50 transition-all font-semibold text-gray-700 cursor-pointer"
                >
                    <GoogleIcon />
                    Sign in with Google
                </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
