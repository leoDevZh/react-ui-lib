export interface SampleUser {
    id: number
    name: string
    email: string
    role: string
    status: 'active' | 'inactive' | 'pending'
    joined: string
}

export const sampleUsers: SampleUser[] = [
    { id: 1, name: 'Ada Lovelace',      email: 'ada@example.com',      role: 'Engineer',   status: 'active',   joined: '2023-01-15' },
    { id: 2, name: 'Grace Hopper',      email: 'grace@example.com',    role: 'Engineer',   status: 'active',   joined: '2023-03-22' },
    { id: 3, name: 'Alan Turing',       email: 'alan@example.com',     role: 'Researcher', status: 'inactive', joined: '2022-11-08' },
    { id: 4, name: 'Margaret Hamilton', email: 'margaret@example.com', role: 'Engineer',   status: 'active',   joined: '2024-02-01' },
    { id: 5, name: 'Linus Torvalds',    email: 'linus@example.com',    role: 'Admin',      status: 'active',   joined: '2022-06-30' },
    { id: 6, name: 'Barbara Liskov',    email: 'barbara@example.com',  role: 'Researcher', status: 'pending',  joined: '2024-05-14' },
    { id: 7, name: 'Bjarne Stroustrup', email: 'bjarne@example.com',   role: 'Engineer',   status: 'inactive', joined: '2023-09-19' },
]
