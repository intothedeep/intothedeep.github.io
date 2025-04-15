import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Layout({ children }: any) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="app">
            <header className="app-header">
                <div className="container">
                    <div className="header-content">
                        <Link
                            href="/"
                            className="logo"
                        >
                            Documentation Portal
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="desktop-nav">
                            <Link href="/">Home</Link>
                            <a
                                href="https://yourdomain.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Main Site
                            </a>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            className="mobile-menu-button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X size={24} />
                            ) : (
                                <Menu size={24} />
                            )}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {mobileMenuOpen && (
                        <nav className="mobile-nav">
                            <Link
                                href="/"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <a
                                href="https://yourdomain.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Main Site
                            </a>
                        </nav>
                    )}
                </div>
            </header>

            <main className="app-main">
                <div className="container">{children}</div>
            </main>

            <footer className="app-footer">
                <div className="container">
                    <p>
                        Documentation Portal &copy; {new Date().getFullYear()}
                    </p>
                </div>
            </footer>
        </div>
    );
}
