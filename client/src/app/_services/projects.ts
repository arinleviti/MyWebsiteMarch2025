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
    videoUrl: '/HeroBurger.mp4',
    posterUrl: '/HeroBurgerPoster.webp',
    linkUrl: 'https://herolacasadelburger.it'
  },
  {
    title: 'Restaurant template',
    description: 'A customizable restaurant website template built with React.',
    videoUrl: '/BestBurgers.mp4',
    posterUrl: '/BestBurgersPoster.webp',
    linkUrl: 'https://heroic-lamington-f2f9a1.netlify.app/'
  }
];