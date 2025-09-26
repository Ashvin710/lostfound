
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import PostItem from './pages/PostItem';
import ItemDetails from './pages/ItemDetails';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Chat from './pages/Chat';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
};

const Main: React.FC = () => {
  const { state } = useAppContext();

  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
        <Header />
        <main className="container mx-auto p-4 md:p-6 lg:p-8">
          <Routes>
            <Route path="/auth" element={!state.isAuthenticated ? <Auth /> : <Navigate to="/" />} />
            <Route path="/" element={state.isAuthenticated ? <Dashboard /> : <Navigate to="/auth" />} />
            <Route path="/post" element={state.isAuthenticated ? <PostItem /> : <Navigate to="/auth" />} />
            <Route path="/item/:id" element={state.isAuthenticated ? <ItemDetails /> : <Navigate to="/auth" />} />
            <Route path="/profile" element={state.isAuthenticated ? <Profile /> : <Navigate to="/auth" />} />
            <Route path="/chat/:userId" element={state.isAuthenticated ? <Chat /> : <Navigate to="/auth" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
