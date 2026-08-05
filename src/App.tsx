import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { BrandKitProvider } from './context/BrandKitContext';
import { TemplateProvider } from './context/TemplateContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { Home } from './pages/public/Home';
import { Templates } from './pages/public/Templates';
import { TemplateDetail } from './pages/public/TemplateDetail';
import { Categories } from './pages/public/Categories';
import { Pricing } from './pages/public/Pricing';
import { About } from './pages/public/About';
import { Contact } from './pages/public/Contact';
import { FAQPage } from './pages/public/FAQ';
import { Blog } from './pages/public/Blog';
import { Careers } from './pages/public/Careers';
import { LegalPages } from './pages/legal/LegalPages';
import { AuthPages } from './pages/auth/AuthPages';
import { AgentDashboard } from './pages/dashboard/AgentDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { PersonalizationStudioPage } from './pages/editor/PersonalizationStudioPage';

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrandKitProvider>
          <TemplateProvider>
            <Router>
              <div className="min-h-screen flex flex-col bg-[#0B1220] text-slate-100 selection:bg-blue-600 selection:text-white">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/templates" element={<Templates />} />
                    <Route path="/template/:slug" element={<TemplateDetail />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/careers" element={<Careers />} />

                    {/* Legal Suite */}
                    <Route path="/privacy" element={<LegalPages />} />
                    <Route path="/terms" element={<LegalPages />} />
                    <Route path="/legal" element={<LegalPages />} />

                    {/* Authentication */}
                    <Route path="/login" element={<AuthPages mode="login" />} />
                    <Route path="/register" element={<AuthPages mode="register" />} />
                    <Route path="/forgot-password" element={<AuthPages mode="forgot" />} />

                    {/* Workspaces & Studio */}
                    <Route path="/editor" element={<PersonalizationStudioPage />} />
                    <Route path="/dashboard" element={<AgentDashboard />} />
                    <Route path="/profile" element={<AgentDashboard />} />
                    <Route path="/settings" element={<AgentDashboard />} />
                    <Route path="/admin" element={<AdminDashboard />} />

                    {/* Fallback 404 Route */}
                    <Route path="*" element={<Home />} />
                  </Routes>
                </main>
                <FooterWrapper />
                <ToastContainer />
              </div>
            </Router>
          </TemplateProvider>
        </BrandKitProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function FooterWrapper() {
  const location = useLocation();
  if (location.pathname === '/editor') return null;
  return <Footer />;
}

export default App;
