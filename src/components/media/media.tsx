import Image from "next/image";

export default function Media() {
  const sponsers = [
    {
      id: 1,
      name: "Sponser 1",
      imageUrl: "/icons/Facebook.png",
    },
    {
      id: 2,
      name: "Sponser 2",
      imageUrl: "/icons/Instagram.png",
    },
    {
      id: 3,
      name: "Sponser 3",
      imageUrl: "/icons/Tiktok.png",
    },
    {
      id: 4,
      name: "Sponser 4",
      imageUrl: "/icons/youtube.png",
    },
    {
      id: 5,
      name: "Sponser 5",
      imageUrl: "/icons/sound.png",
    },
  ];

  return (
    <div className="min-h-[300px] bg-black  w-full mx-auto flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-white mb-8">
            Social Media Links
        </h1>
        <div className="flex lg:flex-row flex-col justify-center max-w-7xl w-full mx-auto">
            {
                sponsers.map((sponser) => (
                    <div key={sponser.id} className="p-4">
                        <Image src={sponser.imageUrl} alt={sponser.name} width={200} height={200} className="h-24  object-contain" />
                    </div>
                ))
            }
        </div>
    </div>
  );
}
