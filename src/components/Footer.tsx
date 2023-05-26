// src/components/Footer.tsx

const Footer = () => {
    return (
        <footer className="p-6 bg-gray-800 text-white text-center">
            <p className="animate__animated animate__fadeInUp">
              Developed by:
                <a href="https://twitter.com/your_handle" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                {" "}BankkRoll{" "}
                </a>
              - &copy; 2023 MusicMind. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;

