import Image from "next/image";

export default function Sponsers() {
  const sponsers = [
    {
      id: 1,
      name: "Sponser 1",
      imageUrl: "/sponsers/muscle.png",
    },
    {
      id: 2,
      name: "Sponser 2",
      imageUrl: "/sponsers/bst.png",
    },
    {
      id: 3,
      name: "Sponser 3",
      imageUrl: "/sponsers/timejerk.png",
    },
    {
      id: 4,
      name: "Sponser 4",
      imageUrl: "/sponsers/cornerstone.png",
    },
    {
      id: 5,
      name: "Sponser 5",
      imageUrl: "/sponsers/jr.png",
    },
  ];

  return (
    <div className="min-h-[500px] bg-black  w-full mx-auto flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-white mb-8">
            Sponsered By 
        </h1>
        <div className="flex lg:flex-row flex-col justify-center max-w-7xl w-full mx-auto">
            {
                sponsers.map((sponser) => (
                    <div key={sponser.id} className="p-4">
                        <Image src={sponser.imageUrl} alt={sponser.name} width={400} height={400} className="h-32 w-auto object-contain" />
                    </div>
                ))
            }
        </div>
    </div>
  );
}
