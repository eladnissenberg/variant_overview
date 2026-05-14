const LINE = '1px solid var(--grid-line)'

export function GridCell({
  borders = [],
  as: As = 'div',
  children,
  className = '',
  style = {},
  ...rest
}) {
  const overlay = {
    borderTop: borders.includes('t') ? LINE : undefined,
    borderRight: borders.includes('r') ? LINE : undefined,
    borderBottom: borders.includes('b') ? LINE : undefined,
    borderLeft: borders.includes('l') ? LINE : undefined,
    zIndex: 3,
  }

  return (
    <As className={`relative ${className}`} style={style} {...rest}>
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={overlay}
      />
      {children}
    </As>
  )
}
