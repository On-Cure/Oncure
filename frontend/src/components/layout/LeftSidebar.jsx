"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import {
  User,
  Users,
  Calendar,
  MessageSquare,
  Heart,
  MessageCircle,
  Bookmark,
  Settings,
  LogOut,
  Coins
} from "lucide-react";

export default function LeftSidebar() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <aside 
      className="fixed left-0 top-16 bottom-0 w-sidebar border-r overflow-y-auto z-20 glassmorphism flex flex-col"
      style={{
        backgroundColor: 'rgba(var(--color-surface), 0.9)',
        borderColor: 'rgb(var(--color-border))'
      }}
    >
      <div className="flex-1 p-6">
        <nav className="flex flex-col gap-2">
          {/* Main Navigation */}
          <Link
            href="/feed"
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-normal hover:scale-105"
            style={{
              color: 'rgb(var(--color-primary))',
              backgroundColor: 'rgba(var(--color-primary), 0.1)'
            }}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Posts</span>
          </Link>

          <Link
            href="/posts/liked"
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-normal hover:scale-105"
            style={{color: 'rgb(var(--color-text-primary))'}}
          >
            <Heart className="w-5 h-5" style={{color: 'rgb(var(--color-tertiary))'}} />
            <span>Liked Posts</span>
          </Link>

          <Link
            href="/posts/commented"
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-normal hover:scale-105"
            style={{color: 'rgb(var(--color-text-primary))'}}
          >
            <MessageSquare className="w-5 h-5" style={{color: 'rgb(var(--color-primary))'}} />
            <span>Commented Posts</span>
          </Link>

          <Link
            href="/posts/saved"
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-normal hover:scale-105"
            style={{color: 'rgb(var(--color-text-primary))'}}
          >
            <Bookmark className="w-5 h-5" style={{color: 'rgb(var(--color-secondary))'}} />
            <span>Saved Posts</span>
          </Link>

          <hr className="my-6 border-border" />

          <h3 className="text-sm font-display font-semibold mb-3 px-4 uppercase tracking-wider" style={{color: 'rgb(var(--color-text-secondary))'}}>Profile</h3>

          <Link
            href="/profile?tab=profile"
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-normal hover:scale-105"
            style={{color: 'rgb(var(--color-text-primary))'}}
          >
            <User className="w-5 h-5" style={{color: 'rgb(var(--color-secondary))'}} />
            <span>My Profile</span>
          </Link>

          <Link
            href="/profile?tab=connections"
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-normal hover:scale-105"
            style={{color: 'rgb(var(--color-text-primary))'}}
          >
            <Users className="w-5 h-5" style={{color: 'rgb(var(--color-primary))'}} />
            <span>Connections</span>
          </Link>

          <hr className="my-6 border-border" />

          <h3 className="text-sm font-display font-semibold mb-3 px-4 uppercase tracking-wider" style={{color: 'rgb(var(--color-text-secondary))'}}>Discover</h3>

          <Link
            href="/communities"
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-normal hover:scale-105"
            style={{color: 'rgb(var(--color-text-primary))'}}
          >
            <Users className="w-5 h-5" style={{color: 'rgb(var(--color-primary))'}} />
            <span>Communities</span>
          </Link>  

          <Link
            href="/chat"
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-normal hover:scale-105"
            style={{color: 'rgb(var(--color-text-primary))'}}
          >
            <MessageSquare className="w-5 h-5" style={{color: 'rgb(var(--color-primary))'}} />
            <span>Messages</span>
          </Link>

          <hr className="my-6 border-border" />

          <Link
            href="/account"
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-normal hover:scale-105"
            style={{color: 'rgb(var(--color-text-primary))'}}
          >
            <Coins className="w-5 h-5" style={{color: 'rgb(var(--color-secondary))'}} />
            <span>Account</span>
          </Link>

          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-normal hover:scale-105"
            style={{color: 'rgb(var(--color-text-secondary))'}}
          >
            <Settings className="w-5 h-5" style={{color: 'rgb(var(--color-text-secondary))'}} />
            <span>Settings</span>
          </Link>
        </nav>
      </div>

      {/* Logout Button at Bottom */}
      <div className="p-6 border-t" style={{borderColor: 'rgb(var(--color-border))'}}>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg font-medium transition-all duration-normal hover:scale-105"
          style={{color: 'rgb(var(--color-tertiary))'}}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
