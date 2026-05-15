import React from 'react'
import type { TabMenuItem } from '../TabMenu'

const panel: React.CSSProperties = {
    padding: '20px',
    borderRadius: '8px',
    background: 'var(--colors-neutral-100, #f5f5f5)',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    color: 'var(--colors-text-primary, #111)',
    lineHeight: 1.6,
}

function OverviewPanel() {
    return (
        <div style={panel}>
            <strong style={{ display: 'block', marginBottom: '8px' }}>Overview</strong>
            <p style={{ margin: 0 }}>
                This is the overview panel. Use it to display a high-level summary, key
                metrics, or introductory content for the selected section.
            </p>
        </div>
    )
}

function SettingsPanel() {
    return (
        <div style={panel}>
            <strong style={{ display: 'block', marginBottom: '12px' }}>Settings</strong>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Notifications', 'Privacy', 'Security'].map((label) => (
                    <label key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{label}</span>
                        <input type="checkbox" defaultChecked />
                    </label>
                ))}
            </div>
        </div>
    )
}

function ProfilePanel() {
    return (
        <div style={{ ...panel, display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                flexShrink: 0
            }} />
            <div>
                <strong>Alex Johnson</strong>
                <p style={{ margin: '4px 0 0', opacity: 0.6 }}>alex@example.com</p>
            </div>
        </div>
    )
}

function AnalyticsPanel() {
    return (
        <div style={{ ...panel, display: 'flex', gap: '12px' }}>
            {[['1.2k', 'Visitors'], ['340', 'Clicks'], ['18%', 'Conversion']].map(([val, lbl]) => (
                <div key={lbl} style={{ flex: 1, textAlign: 'center', padding: '12px', borderRadius: '6px', background: 'rgba(255,255,255,0.6)' }}>
                    <div style={{ fontSize: '20px', fontWeight: 700 }}>{val}</div>
                    <div style={{ fontSize: '12px', opacity: 0.6, marginTop: '4px' }}>{lbl}</div>
                </div>
            ))}
        </div>
    )
}

export const tabItems: TabMenuItem[] = [
    { title: 'Overview', component: OverviewPanel },
    { title: 'Settings', component: SettingsPanel },
    { title: 'Profile', component: ProfilePanel },
    { title: 'Analytics', component: AnalyticsPanel },
]

export const manyTabItems: TabMenuItem[] = [
    ...tabItems,
    { title: 'Reports', component: OverviewPanel },
    { title: 'Billing', component: SettingsPanel },
    { title: 'Team', component: ProfilePanel },
    { title: 'Docs', component: AnalyticsPanel },
]