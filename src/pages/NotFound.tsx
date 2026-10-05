import Button from '../components/Button'
import AnimatedNetwork from '../components/AnimatedNetwork'

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[100svh] place-items-center overflow-hidden px-5 text-center">
      <AnimatedNetwork className="-z-10" />
      <div>
        <p className="font-display text-8xl font-bold text-gradient sm:text-9xl">404</p>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">This connection does not exist.</h1>
        <p className="mx-auto mt-4 max-w-md text-slate-400">The page you are looking for has moved or never existed. Head back home and pick a product to explore.</p>
        <div className="mt-8"><Button to="/">Back to home</Button></div>
      </div>
    </section>
  )
}
