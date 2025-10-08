import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const sponsers = [
    {
      id: 1,
      name: "Sponser 1",
      imageUrl: "/icons/Facebook.png",
      link: "https://www.facebook.com/ruthless.chris.3",
    },
    {
      id: 2,
      name: "Sponser 2",
      imageUrl: "/icons/Instagram.png",
      link: "https://www.instagram.com/djruthlesschris/",
    },
    {
      id: 3,
      name: "Sponser 3",
      imageUrl: "/icons/Tiktok.png",
      link: "https://www.tiktok.com/@ruthlesschris",
    },
    {
      id: 4,
      name: "Sponser 4",
      imageUrl: "/icons/youtube.png",
      link: "https://www.youtube.com/channel/UCJo5jo6BQ7rvj5kM89_LyZA",
    },
    {
      id: 5,
      name: "Sponser 5",
      imageUrl: "/icons/sound.png",
      link: "",
    },
    {
      id: 6,
      name: "Sponser 6",
      imageUrl: "/icons/jr.png",
      link: "",
    },
  ];

  return (
    <footer className="bg-[url('/footer-bg.png')] w-full flex items-center justify-center text-white py-8 px-6">
      <div className="w-full max-w-7xl mx-auto">
        <div className="w-full flex flex-col md:flex-row items-start justify-center gap-8">
          {/* Logo */}
          <div className="lg:w-1/3 h-full flex justify-center items-center">
            <Image src="/logo.png" alt="Logo" width={100} height={100} />
          </div>

          {/* Content Columns */}
          <div className="lg:w-2/3 flex flex-col md:flex-row gap-8 md:gap-16 flex-1">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    All
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Play
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Info
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Share
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="space-y-2">
                <p className="text-gray-300 flex  gap-2 items-center">
                  <Image src="/icons/call.png" width={15} height={15} alt="" />{" "}
                  xxxx xxxx xx
                </p>
                <p className="text-gray-300 flex  gap-2 items-center">
                  <Image
                    src="/icons/message.png"
                    width={15}
                    height={15}
                    alt=""
                  />{" "}
                  xxxx@xxx@gmail.com
                </p>
              </div>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {/* YouTube */}
                {sponsers.map((sponser) => (
                  <Link
                    key={sponser.id}
                    href={sponser.link || "#"}
                    target="_blank"
                    className="w-8 h-8 bg-red-600 rounded flex items-center justify-center hover:bg-red-700 transition-colors"
                  >
                    <Image
                      alt="tiktok"
                      src={sponser.imageUrl}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            @2025 Ruthless Chris RC All Rights Reserved | Designed & Developed
            by Whitecode Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
