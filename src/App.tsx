/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TriangleAlert, Laugh } from 'lucide-react';

export default function App() {
  // State to store user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // prankStep tracks what to show:
  // 0: Login Form
  // 2: April Fool Message
  const [prankStep, setPrankStep] = useState<0 | 2>(0);

  // Helper function to play sounds
  const playSound = (url: string) => {
    const audio = new Audio(url);
    audio.volume = 0.5; // Set volume to 50%
    audio.play().catch(err => console.log("Audio play blocked by browser:", err));
  };

  // Sound URLs
  const SOUNDS = {
    CLICK: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
    FAILURE: 'https://assets.mixkit.co/active_storage/sfx/2534/2534-preview.mp3',
    LAUGH: 'https://assets.mixkit.co/active_storage/sfx/2040/2040-preview.mp3',
    RESET: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'
  };

  // This function resets the app back to the login screen
  const resetPrank = () => {
    playSound(SOUNDS.RESET);
    setPrankStep(0);
    setEmail('');
    setPassword('');
    setError('');
  };

  // This function runs when the "Login" button is clicked
  const handleLogin = (e: FormEvent) => {
    e.preventDefault(); // Prevents the page from reloading
    setError('');

    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    
    playSound(SOUNDS.CLICK);
    setIsLoading(true);
    
    // Simulate a login delay
    setTimeout(() => {
      setIsLoading(false);
      setPrankStep(2);
      playSound(SOUNDS.LAUGH);
    }, 3000); // 3 seconds delay
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Please enter your details to login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium"
            >
              {error}
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="name@example.com"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="••••••••"
            />
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={!isLoading ? { scale: 1.02, backgroundColor: '#1d4ed8' } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
            disabled={isLoading}
            type="submit"
            className={`w-full text-white font-semibold py-3 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 ${
              isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 shadow-blue-200'
            }`}
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </motion.button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Don't have an account? <span className="text-blue-600 font-medium cursor-pointer hover:underline">Sign up</span>
        </div>
      </div>

      {/* Prank Overlays */}
      <AnimatePresence>
        {prankStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-blue-600 p-4"
          >
            <div className="text-center text-white">
              <motion.div
                animate={{ rotate: [0, 10, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                <Laugh className="w-32 h-32 mx-auto mb-8" />
              </motion.div>
              <h2 className="text-6xl font-black mb-4 drop-shadow-lg">
                😂 April Fool!
              </h2>
              <p className="text-2xl font-medium opacity-90 mb-12">
                Don't worry, your data is safe (because it never existed).
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetPrank}
                  className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-xl shadow-xl hover:bg-gray-100 transition-all active:scale-95"
                >
                  Try Again?
                </button>
                <button
                  onClick={resetPrank}
                  className="bg-blue-500 text-white border-2 border-white/20 px-8 py-4 rounded-full font-bold text-xl shadow-xl hover:bg-blue-400 transition-all active:scale-95"
                >
                  Retry
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
