import { CircularCarousel } from "@/components/carousels/circular-carousel"
import {
  HomeIcon,
  UserIcon,
  SettingsIcon,
  HeartIcon,
  StarIcon,
  CameraIcon,
  MusicIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
} from "lucide-react"

const carouselItems = [
  {
    id: "1",
    icon: <HomeIcon className="w-8 h-8" />,
    label: "Home",
    backgroundImage: "/modern-home-warm-lighting.png",
  },
  {
    id: "2",
    icon: <UserIcon className="w-8 h-8" />,
    label: "Profile",
    backgroundImage: "/photography-studio.png",
  },
  {
    id: "3",
    icon: <SettingsIcon className="w-8 h-8" />,
    label: "Settings",
    backgroundImage: "/modern-tech-workspace-with-gears-and-tools.jpg",
  },
  {
    id: "4",
    icon: <HeartIcon className="w-8 h-8" />,
    label: "Favorites",
    backgroundImage: "/romantic-sunset-landscape-with-heart-shapes.jpg",
  },
  {
    id: "5",
    icon: <StarIcon className="w-8 h-8" />,
    label: "Reviews",
    backgroundImage: "/night-sky-filled-with-bright-stars-and-galaxies.jpg",
  },
  {
    id: "6",
    icon: <CameraIcon className="w-8 h-8" />,
    label: "Photos",
    backgroundImage: "/vintage-camera-with-beautiful-bokeh-photography.jpg",
  },
  {
    id: "7",
    icon: <MusicIcon className="w-8 h-8" />,
    label: "Music",
    backgroundImage: "/concert-stage-with-colorful-lights-and-musical-not.jpg",
  },
  {
    id: "8",
    icon: <MailIcon className="w-8 h-8" />,
    label: "Messages",
    backgroundImage: "/vintage-letters-and-envelopes-on-wooden-desk.jpg",
  },
  {
    id: "9",
    icon: <PhoneIcon className="w-8 h-8" />,
    label: "Calls",
    backgroundImage: "/modern-smartphone-with-communication-waves.jpg",
  },
  {
    id: "10",
    icon: <CalendarIcon className="w-8 h-8" />,
    label: "Calendar",
    backgroundImage: "/elegant-calendar-pages-with-seasonal-elements.jpg",
  },
]

export default function Page() {
  return (
    <main className="min-h-screen">
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20 text-center">
        <div className="bg-white/95 backdrop-blur-md rounded-lg px-8 py-6 border-2 border-gray-200 shadow-2xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Circular Icons Carousel</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Navigate through icons with smooth transitions and synchronized backgrounds.
          </p>
        </div>
      </div>

      <CircularCarousel items={carouselItems} />
    </main>
  )
}
