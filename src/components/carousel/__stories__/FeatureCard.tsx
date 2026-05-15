type FeatureCardProps = {
  number: string
  title: string
  description: string
  gradient: string
}

export const FeatureCard = ({ number, title, description, gradient }: FeatureCardProps) => (
  <div
    style={{
      background: gradient,
      borderRadius: '20px',
      width: '260px',
      height: '160px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px',
      boxSizing: 'border-box',
      color: 'white',
      flexShrink: 0,
    }}
  >
    <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', opacity: 0.65 }}>
      {number}
    </span>
    <div>
      <div style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>{title}</div>
      <div style={{ fontSize: '12px', opacity: 0.85, lineHeight: 1.5 }}>{description}</div>
    </div>
  </div>
)

export const featureSlides = [
  { number: '01', title: 'Design System', description: 'Consistent spacing, color, and type tokens across every component', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { number: '02', title: 'Animations', description: 'GSAP-powered timelines, text splits, and SVG transitions', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { number: '03', title: 'Responsive', description: 'Mobile-first architecture with native touch gesture support', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { number: '04', title: 'Theming', description: 'Runtime-switchable classic and glassmorphism visual styles', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { number: '05', title: 'TypeScript', description: 'Fully typed with strict mode and no implicit any', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
]