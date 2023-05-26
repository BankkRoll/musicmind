// src/components/Header.tsx
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface CustomButtonProps {
  children: React.ReactNode;
  href: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, href }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href)}
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 animate__animated animate__pulse"
    >
      {children}
    </button>
  );
};

const Header = () => {
  return (
    <header className="flex justify-between items-center py-6 px-4 bg-gray-800 text-white sm:px-6 lg:px-8 animate__animated animate__fadeInDown">
      <Link href="/">
        <p className="text-2xl font-extrabold text-green-500 hover:text-green-400 transition duration-300">
            MusicMind
        </p>
      </Link>
      <nav>
        <ul className="flex space-x-4">
            <li>
              <Link href="/create">
                <p className="text-white hover:text-gray-300 transition duration-300">Create</p>
              </Link>
            </li>
          <SignedIn>
            <li>
              <Link href="/profile">
                <p className="text-white hover:text-gray-300 transition duration-300">Profile</p>
              </Link>
            </li>
            <li>
              <UserButton />
            </li>
          </SignedIn>
          <SignedOut>
            <li>
              <CustomButton href="/sign-in">Sign In</CustomButton>
            </li>
          </SignedOut>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
