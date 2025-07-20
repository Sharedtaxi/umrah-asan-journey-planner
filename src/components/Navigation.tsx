import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin, Phone, Mail, User, LogOut } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSelector from './LanguageSelector';

const Navigation = () => {
  console.log('Navigation: Component is rendering');
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  const { user, profile, signOut } = useAuth();
  console.log('Navigation: Got auth values:', { user: !!user, profile: !!profile });

  // If user is admin or partner and on dashboard page, show simplified navigation
  const isDashboardUser = profile?.user_type === 'admin' || profile?.user_type === 'partner';
  const isDashboardPage = location.pathname.includes('dashboard');
  
  if (isDashboardUser && isDashboardPage) {
    return (
      <nav className="bg-background shadow-card border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/308484dd-1a34-41ae-9cca-4a601bf3d89b.png" 
                alt="Umrah Asan Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-lg font-bold text-primary whitespace-nowrap">Umrah Asan</span>
            </Link>

            {/* Dashboard Title */}
            <div className="flex-1 text-center">
              <h1 className="text-lg font-semibold text-primary">
                {profile?.user_type === 'admin' ? 'Admin Dashboard' : 'Partner Dashboard'}
              </h1>
            </div>

            {/* Logout Button */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={signOut}
              className="flex items-center space-x-1"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-xs">{t('nav.logout')}</span>
            </Button>
          </div>
        </div>
      </nav>
    );
  }

  const navLinks = [
    { name: t('nav.home'), path: "/" },
    { name: t('nav.ziaraat'), path: "/ziaraat" },
    { name: t('nav.taxi'), path: "/taxi" },
    { name: t('nav.guide'), path: "/guide" },
    { name: t('nav.train'), path: "/train" },
    { name: t('nav.blogs'), path: "/blogs" },
    { name: t('nav.faq'), path: "/faq" },
    { name: t('nav.about'), path: "/about" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background shadow-card border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/308484dd-1a34-41ae-9cca-4a601bf3d89b.png" 
              alt="Umrah Asan Logo" 
              className="w-18 h-16 object-contain"
            />
            <span className="text-lg font-bold text-primary whitespace-nowrap">Umrah Asan</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-2 py-2 rounded-md text-xs font-medium transition-colors ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Language & Login */}
          <div className="hidden md:flex items-center space-x-3">
            <LanguageSelector />
            
            {user ? (
              <div className="flex items-center space-x-2">
                <Link to={profile?.user_type === 'admin' ? '/admin-dashboard' : profile?.user_type === 'partner' ? '/partner-dashboard' : '/guest-dashboard'}>
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span className="text-xs">{profile?.full_name || 'Dashboard'}</span>
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={signOut}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-xs">{t('nav.logout')}</span>
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  <span className="text-xs">{t('nav.guestLogin')}</span>
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t">
                <div className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>info@umrahasan.com</span>
                </div>
                <div className="px-3 py-2 space-y-2">
                  <LanguageSelector />
                  {user ? (
                    <div className="space-y-2">
                      <Link to={profile?.user_type === 'admin' ? '/admin-dashboard' : profile?.user_type === 'partner' ? '/partner-dashboard' : '/guest-dashboard'}>
                        <Button variant="outline" size="sm" className="w-full flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{profile?.full_name || 'Dashboard'}</span>
                        </Button>
                      </Link>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full flex items-center space-x-1"
                          onClick={signOut}
                        >
                          <LogOut className="w-4 h-4" />
                          <span>{t('nav.logout')}</span>
                        </Button>
                    </div>
                  ) : (
                      <Link to="/login">
                        <Button variant="outline" size="sm" className="w-full">
                          {t('nav.guestLogin')}
                        </Button>
                      </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
