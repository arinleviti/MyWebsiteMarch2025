export interface Project {
  title: string;
  description: string;
  videoUrl: string;
  posterUrl: string;
  linkUrl: string;
}

export const projects: Project[] = [
  {
    title: 'Hero Burger',
    description: 'Responsive React and Next.js website for a restaurant in Predazzo, Italy. Includes Framer Motion animations, dynamic menu filtering, a Supabase-powered blog with CRUD, and a Swiper carousel for featured items.',
    videoUrl: 'https://res.cloudinary.com/doydy0awd/video/upload/f_auto,q_auto,fl_lossy,h_720,vc_auto/v1756396707/HeroBurger_mcpkxj.mp4',
    posterUrl: '/HeroBurgerPoster.webp',
    linkUrl: 'https://herolacasadelburger.it'
  },
  {
    title: 'Restaurant template',
    description: 'A customizable restaurant website template built with React.',
    videoUrl: 'https://res.cloudinary.com/doydy0awd/video/upload/f_auto,q_auto,fl_lossy,h_720,vc_auto/v1756396722/BestBurgers_jpjyit.mp4',
    posterUrl: '/BestBurgersPoster.webp',
    linkUrl: 'https://heroic-lamington-f2f9a1.netlify.app/'
  }
];