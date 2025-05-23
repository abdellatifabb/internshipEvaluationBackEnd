"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../components/ui/button";
import { 
  User, 
  Briefcase, 
  FileText, 
  ClipboardList,
  Menu,
  X,
  ListChecks
} from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Évaluation",
      href: "/",
      icon: <ClipboardList className="h-4 w-4 mr-2" />,
    },
    {
      name: "Évaluations",
      href: "/evaluations",
      icon: <ListChecks className="h-4 w-4 mr-2" />,
    },
    {
      name: "Stagiaires",
      href: "/stagiaires",
      icon: <User className="h-4 w-4 mr-2" />,
    },
    {
      name: "Tuteurs",
      href: "/tutors",
      icon: <Briefcase className="h-4 w-4 mr-2" />,
    },
    {
      name: "Stages",
      href: "/stages",
      icon: <FileText className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <>
      {/* Mobile navigation */}
      <div className="md:hidden bg-white border-b border-gray-200 py-3 px-4 flex justify-between items-center">
        <Link href="/" className="text-lg font-bold text-blue-700">
          Évaluation de Stage
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-2">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center py-2 px-3 rounded-md ${
                  pathname === item.href
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Desktop navigation */}
      <div className="hidden md:flex bg-white border-b border-gray-200 py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-700">
            Évaluation de Stage
          </Link>
          <nav className="flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center py-2 px-4 rounded-md ${
                  pathname === item.href
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
