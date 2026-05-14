import { GridCell } from './GridCell'

export default function Footer() {
  return (
    <GridCell as="footer" borders={['t', 'l', 'r', 'b']} className="w-full px-8 md:px-16 py-12 md:py-16">
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <div className="text-xl font-bold tracking-[-0.02em] text-cream mb-2">variant</div>
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Variant. AI personalization for eCommerce.
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-6 md:gap-8">
          <a href="#how" className="text-sm text-white/55 hover:text-cream transition-colors">Product</a>
          <a href="#outcomes" className="text-sm text-white/55 hover:text-cream transition-colors">Outcomes</a>
          <a href="https://app.variantnow.com" className="text-sm text-white/55 hover:text-cream transition-colors">Log in</a>
          <a href="mailto:hello@variantnow.com" className="text-sm text-white/55 hover:text-cream transition-colors">Get in touch</a>
        </nav>
      </div>
    </GridCell>
  )
}
