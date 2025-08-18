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
    description: 'Paid project: responsive React and Next.js website for a real restaurant. Includes Framer Motion animations, dynamic menu filtering, a Supabase-powered blog with CRUD, and a Swiper carousel for featured items.',
    videoUrl: '/HeroBurger.mp4',
    posterUrl: '/HeroBurgerPoster.jpg',
    linkUrl: 'https://herolacasadelburger.it'
  },
  {
    title: 'Restaurant template',
    description: 'A customizable restaurant website template built with React.',
    videoUrl: '/BestBurgers.mp4',
    posterUrl: '/BestBurgersPoster.jpg',
    linkUrl: 'https://heroic-lamington-f2f9a1.netlify.app/'
  }
];