import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GamificationToast, ToastPayload } from './components/GamificationToast';
import { HomePage } from './pages/HomePage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { LineDirectoryPage } from './pages/LineDirectoryPage';
import { LiveStatusPage } from './pages/LiveStatusPage';
import { AboutManifestoPage } from './pages/AboutManifestoPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { Stop, UserStats } from './types/transit';
import { fetchStops, fetchStats } from './services/api';

const AppContent: React.FC = () => {
  const [stops, setStops] = useState<Stop[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [toast, setToast] = useState<ToastPayload | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const [stopsData, statsData] = await Promise.all([
          fetchStops(),
          fetchStats()
        ]);
        setStops(stopsData);
        setStats(statsData.stats);
      } catch (err) {
        console.error('Initialization error:', err);
      }
    }
    init();
  }, []);

  const { isAuthenticated } = useAuth();

  const handleTriggerToast = (xpGained: number, carbonSavedGrams: number) => {
    if (!isAuthenticated) return;
    setToast({
      id: String(Date.now()),
      xpGained,
      carbonSavedGrams
    });

    if (stats) {
      setStats({
        ...stats,
        xp: stats.xp + xpGained,
        carbonSavedGrams: stats.carbonSavedGrams + carbonSavedGrams,
        routesScanned: stats.routesScanned + 1
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] font-sans flex flex-col selection:bg-[#1A1A1A] selection:text-[#F9F8F6]">
      {/* Editorial Navigation */}
      <Navbar stats={stats} />

      {/* Main Publication Content */}
      <main className="flex-1 w-full mx-auto px-4 sm:px-8 py-8">
        <Routes>
          <Route
            path="/"
            element={<HomePage stops={stops} onTriggerToast={handleTriggerToast} />}
          />
          <Route
            path="/search"
            element={<SearchResultsPage stops={stops} onTriggerToast={handleTriggerToast} />}
          />
          <Route
            path="/lines"
            element={<LineDirectoryPage />}
          />
          <Route
            path="/status"
            element={
              <ProtectedRoute>
                <LiveStatusPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={<AboutManifestoPage />}
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/register"
            element={<RegisterPage />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Sleek Charcoal Editorial Gamification Toast */}
      <GamificationToast
        toast={toast}
        onClose={() => setToast(null)}
      />

      {/* Editorial Typographic Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
