import { Shield, CheckCircle } from 'lucide-react';

export default function VerificationBadge({ 
  role, 
  verificationStatus, 
  size = 'sm',
  showText = false 
}) {
  if (role === 'user' || verificationStatus !== 'verified') {
    return null;
  }

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const getBadgeColor = () => {
    switch (role) {
      case 'coach':
        return 'text-[#06D6A0]';
      case 'mentor':
        return 'text-[#3A86FF]';
      default:
        return 'text-[#B8C1CF]';
    }
  };

  const getBadgeText = () => {
    switch (role) {
      case 'coach':
        return 'Verified Coach';
      case 'mentor':
        return 'Verified Mentor';
      default:
        return 'Verified';
    }
  };

  return (
    <div className="inline-flex items-center gap-1">
      <div className="relative">
        <Shield className={`${sizeClasses[size]} ${getBadgeColor()}`} />
        <CheckCircle className={`absolute -top-1 -right-1 ${sizeClasses[size === 'lg' ? 'sm' : 'sm']} ${getBadgeColor()}`} />
      </div>
      {showText && (
        <span className={`${textSizeClasses[size]} ${getBadgeColor()} font-medium`}>
          {getBadgeText()}
        </span>
      )}
    </div>
  );
}