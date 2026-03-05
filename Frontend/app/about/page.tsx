import AnimatedNav    from '@/components/sections/AnimatedNav'
import AnimatedAbout  from '@/components/sections/AnimatedAbout'
import AnimatedFooter from '@/components/sections/AnimatedFooter'

export const metadata = {
  title: 'About Us — SpringForge',
  description: 'Meet the team behind the SpringForge IntelliJ plugin.',
}

export default function AboutPage() {
  return (
    <>
      <AnimatedNav />
      <AnimatedAbout />
      <AnimatedFooter />
    </>
  )
}
