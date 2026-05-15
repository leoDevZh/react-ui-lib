import React from 'react'

const baseCard: React.CSSProperties = {
    width: '240px',
    height: '320px',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '24px',
    boxSizing: 'border-box',
    fontFamily: 'sans-serif',
}

export function CardFront() {
    return (
        <div
            style={{
                ...baseCard,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
            }}
        >
            <div style={{ fontSize: '48px' }}>✦</div>
            <div style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '0.05em' }}>
                Hover me
            </div>
            <div style={{ fontSize: '13px', opacity: 0.75, textAlign: 'center' }}>
                Front face of the card
            </div>
        </div>
    )
}

export function CardBack() {
    return (
        <div
            style={{
                ...baseCard,
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: '#fff',
            }}
        >
            <div style={{ fontSize: '48px' }}>◈</div>
            <div style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '0.05em' }}>
                Revealed!
            </div>
            <div style={{ fontSize: '13px', opacity: 0.75, textAlign: 'center' }}>
                Back face of the card
            </div>
        </div>
    )
}