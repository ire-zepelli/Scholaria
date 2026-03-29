export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">

      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">

        <div className="flex items-center space-x-2">
          <img src="/navbar-logo.png" alt="Grad Cap Logo" className="w-20 h-20" />
          <img src="/logo.png" alt="Scholaria Logo" className="w-55 h-15" />
        </div>

        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/facebook.png" alt="Facebook" className="w-10 h-10" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/instagram.png" alt="Instagram" className="w-10 h-10" />
          </a>
          <a href="mailto:example@email.com">
            <img src="/mail.png" alt="Email" className="w-10 h-10" />
          </a>
        </div>
      </div>

      <div className="bg-blue-900 text-white text-center py-4 text-sm">
        © 2026 Scholaria. All Rights Reserved.
      </div>
    </footer>
  );
}