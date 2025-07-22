import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import MovieDetail from './pages/MovieDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Favorites from './pages/Favorites';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#0f0f0f] font-mono">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/favorites" 
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Layout>
          
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1a1a1a',
                color: '#ffffff',
                border: '1px solid #8b5cf6',
                borderRadius: '8px',
              },
              success: {
                iconTheme: {
                  primary: '#8b5cf6',
                  secondary: '#ffffff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ff3e3e',
                  secondary: '#ffffff',
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;