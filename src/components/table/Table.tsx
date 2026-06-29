// Usage example:
// const columns: ColumnDef<User>[] = [
//   { key: 'name',   header: 'Name',   width: 2 },
//   { key: 'email',  header: 'Email',  width: 3 },
//   { key: 'status', header: 'Status', width: '100px',
//     render: (_, row) => <StatusBadge status={row.status} /> },
// ]
// <Table columns={columns} data={users} rowKey="id" onRowClick={(row, i) => console.log(row, i)} />

import React from 'react'
import styles from './table.module.css'
import {useTheme} from '../provider'

export interface ColumnDef<TData = unknown> {
    key: string
    header: string
    width?: string | number
    // render returns ReactNode (not ComponentType) because callers return evaluated JSX, not component classes
    render?: (value: unknown, row: TData, rowIndex: number) => React.ReactNode
}

export interface TableProps<TData = unknown>
    extends Omit<React.HTMLAttributes<HTMLTableElement>, 'onClick'> {
    columns: ColumnDef<TData>[]
    data: TData[]
    onRowClick?: (row: TData, rowIndex: number) => void
    onCellClick?: (row: TData, column: ColumnDef<TData>, rowIndex: number) => void
    rowKey?: keyof TData | ((row: TData, index: number) => string | number)
}

function toGridCols(columns: Pick<ColumnDef, 'width'>[]): string {
    return columns.map(col => {
        if (col.width === undefined) return '1fr'
        if (typeof col.width === 'string') return col.width
        return `${col.width}fr`
    }).join(' ')
}

function resolveRowKey<TData>(
    row: TData,
    index: number,
    rowKey?: keyof TData | ((row: TData, index: number) => string | number)
): string | number {
    if (!rowKey) return index
    if (typeof rowKey === 'function') return rowKey(row, index)
    return (row as Record<string, unknown>)[rowKey as string] as string | number
}

function Table<TData = unknown>({
    columns,
    data,
    onRowClick,
    onCellClick,
    rowKey,
    className,
                                    ...rest
}: TableProps<TData>) {
    const { theme } = useTheme()
    const isMorphism = theme.style === 'morphism'

    const gridCols = toGridCols(columns)

    const tableClasses = [
        styles.table,
        isMorphism ? styles.morphism : styles.classic,
        className,
    ].filter(Boolean).join(' ')

    const isRowClickable = !!onRowClick
    const trClasses = [styles.tr, isRowClickable && styles.trClickable].filter(Boolean).join(' ')

    const isCellClickable = !!onCellClick
    const tdClasses = [styles.td, isCellClickable && styles.tdClickable].filter(Boolean).join(' ')

    function handleRowKeyDown(row: TData, rowIndex: number) {
        return (e: React.KeyboardEvent<HTMLTableRowElement>) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onRowClick?.(row, rowIndex)
            }
        }
    }

    return (
        <table
            {...rest}
            className={tableClasses}
            style={{ '--table-cols': gridCols } as React.CSSProperties}
            role="table"
        >
            <thead className={styles.thead} role="rowgroup">
                <tr className={styles.tr} role="row">
                    {columns.map(col => (
                        <th
                            key={col.key}
                            className={styles.th}
                            role="columnheader"
                            scope="col"
                        >
                            {col.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className={styles.tbody} role="rowgroup">
                {data.map((row, rowIndex) => {
                    const key = resolveRowKey(row, rowIndex, rowKey)

                    return (
                        <tr
                            key={key}
                            className={trClasses}
                            role="row"
                            onClick={isRowClickable ? () => onRowClick(row, rowIndex) : undefined}
                            onKeyDown={isRowClickable ? handleRowKeyDown(row, rowIndex) : undefined}
                            tabIndex={isRowClickable ? 0 : undefined}
                        >
                            {columns.map(col => {
                                const rawValue = (row as Record<string, unknown>)[col.key]
                                const cellContent = col.render
                                    ? col.render(rawValue, row, rowIndex)
                                    : rawValue as React.ReactNode

                                return (
                                    <td
                                        key={col.key}
                                        className={tdClasses}
                                        role="cell"
                                        onClick={isCellClickable
                                            ? (e) => {
                                                e.stopPropagation()
                                                onCellClick(row, col, rowIndex)
                                            }
                                            : undefined
                                        }
                                    >
                                        {cellContent}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export { Table }
