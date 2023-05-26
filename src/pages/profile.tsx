// src/pages/profile.tsx
import { UserProfile } from '@clerk/nextjs';

export default function ProfilePage() {
  return (
    <div className="flex justify-center items-center h-full p-10 bg-gray-200">
      <UserProfile path="/profile" routing="path" />
    </div>
  );
}

