import { Navbar } from '@/components/portfolio/Navbar'
import { Footer } from '@/components/portfolio/Footer'
import { ProjectsPageContent } from '@/components/portfolio/ProjectsPageContent'

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <ProjectsPageContent />
      <Footer copyright="©" rights="All rights reserved." />
    </>
  )
}
