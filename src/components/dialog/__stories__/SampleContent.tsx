const SampleContent = () => (
    <div style={{ padding: '0.5rem 0' }}>
        <h4 style={{ marginBottom: '0.75rem', fontFamily: 'inherit' }}>Custom Content</h4>
        <p style={{ marginBottom: '0.5rem', lineHeight: 1.5 }}>
            This dialog renders custom children instead of the <code>title</code> and{' '}
            <code>text</code> props.
        </p>
        <p style={{ lineHeight: 1.5, opacity: 0.7 }}>
            Any React node can be passed as children when you need richer content than a simple
            heading and paragraph.
        </p>
    </div>
)

export { SampleContent }
