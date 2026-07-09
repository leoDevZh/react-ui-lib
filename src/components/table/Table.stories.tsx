import type {Meta, StoryObj} from '@storybook/react'
import {fn} from '@storybook/test'
import type {ColumnDef} from './Table'
import {Table} from './Table'
import {SampleUser, sampleUsers} from './__stories__/tableFixtures'

const STATUS_COLORS: Record<string, string> = {
    active:   'var(--colors-status-success)',
    inactive: 'var(--colors-text-tertiary)',
    pending:  'var(--colors-status-warning)',
}

function StatusBadge({ status }: { status: string }) {
    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: 'var(--typography-fontSize-xs)',
            color: STATUS_COLORS[status] ?? 'inherit',
            fontWeight: 600,
            textTransform: 'capitalize',
        }}>
            <span style={{
                display: 'inline-block',
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: STATUS_COLORS[status] ?? 'currentColor',
            }} />
            {status}
        </span>
    )
}

// Generic components need explicit type parameters in stories — use render functions
// to avoid Storybook defaulting to Table<unknown> and losing keyof TData resolution.
const meta: Meta<typeof Table> = {
    title: 'Components/Table',
    component: Table,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
    },
}

export default meta
type Story = StoryObj<typeof Table>

const baseColumns: ColumnDef<SampleUser>[] = [
    { key: 'name',   header: 'Name',   width: 2 },
    { key: 'email',  header: 'Email',  width: 3 },
    { key: 'role',   header: 'Role',   width: 2 },
    { key: 'joined', header: 'Joined', width: 2 },
]

const rowClick = fn()
const cellClick = fn()

export const Default: Story = {
    render: () => (
        <Table<SampleUser>
            columns={baseColumns}
            data={sampleUsers}
            rowKey="id"
            onRowClick={rowClick}
        />
    ),
}

export const MixedWidths: Story = {
    name: 'Mixed widths (fixed + flex)',
    render: () => (
        <Table<SampleUser>
            columns={[
                { key: 'name',   header: 'Name',   width: 2 },
                { key: 'email',  header: 'Email',  width: 3 },
                {
                    key: 'status',
                    header: 'Status',
                    width: '120px',
                    render: (_, row) => <StatusBadge status={row.status} />,
                },
            ]}
            data={sampleUsers}
            rowKey="id"
            onRowClick={rowClick}
        />
    ),
}

export const WithCellClick: Story = {
    name: 'Cell click overrides row click',
    render: () => (
        <Table<SampleUser>
            columns={[
                { key: 'name',  header: 'Name',  width: 2 },
                { key: 'email', header: 'Email (click me)', width: 3 },
                { key: 'role',  header: 'Role',  width: 2 },
                {
                    key: 'status',
                    header: 'Status',
                    width: '120px',
                    render: (_, row) => <StatusBadge status={row.status} />,
                },
            ]}
            data={sampleUsers}
            rowKey="id"
            onRowClick={rowClick}
            onCellClick={cellClick}
        />
    ),
}

export const NoClickHandlers: Story = {
    name: 'Read-only (no click handlers)',
    render: () => (
        <Table<SampleUser>
            columns={baseColumns}
            data={sampleUsers}
            rowKey="id"
        />
    ),
}

// Generates enough rows to make the table scroll so the sticky header is observable.
// @ts-ignore
const manyUsers: SampleUser[] = Array.from({ length: 40 }, (_, i) => ({
    id:     100 + i,
    name:   `User ${i + 1}`,
    email:  `user${i + 1}@example.com`,
    role:   ['Engineer', 'Researcher', 'Admin', 'Designer'][i % 4],
    status: (['active', 'inactive', 'pending'] as const)[i % 3],
    joined: `202${(i % 4) + 1}-${String((i % 12) + 1).padStart(2, '0')}-01`,
}))

export const InitialLoading: Story = {
    name: 'Loading (initial fetch, no data yet)',
    render: () => (
        <Table<SampleUser>
            columns={baseColumns}
            data={[]}
            rowKey="id"
            loading
        />
    ),
}

export const Refetching: Story = {
    name: 'Loading (refetch, stale data dimmed)',
    render: () => (
        <Table<SampleUser>
            columns={baseColumns}
            data={sampleUsers}
            rowKey="id"
            onRowClick={rowClick}
            loading
        />
    ),
}

export const StickyHeader: Story = {
    name: 'Sticky header (scroll to verify)',
    parameters: { docs: { description: { story: 'Wrap the table in a height-constrained, scrollable container. Scroll down — the header must stay pinned at the top.' } } },
    render: () => (
        <div style={{ height: 320, overflowY: 'auto', border: '1px solid var(--colors-border-subtle)', borderRadius: 'var(--borderRadius-md)' }}>
            <Table<SampleUser>
                columns={baseColumns}
                data={manyUsers}
                rowKey="id"
            />
        </div>
    ),
}
