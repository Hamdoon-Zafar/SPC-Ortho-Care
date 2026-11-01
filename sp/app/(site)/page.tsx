import { getClinic, getPosts, getServices, getTeam } from '@/lib/content';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Team from '@/components/Team';
import Updates from '@/components/Updates';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';

// Server component: content comes from Sanity at build time (lib/content.ts) and is passed down as props.
export default async function Page() {
  const [clinic, services, team, posts] = await Promise.all([getClinic(), getServices(), getTeam(), getPosts()]);
  return (
    <>
      <Header name={clinic.name} />
      <main>
        <Hero />
        <Services services={services} />
        <Team team={team} />
        <Updates posts={posts} />
        <Contact clinic={clinic} />
      </main>
      <Footer clinic={clinic} />
      <FloatingActions />
    </>
  );
}
