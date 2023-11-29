import { jest } from '@jest/globals';

jest.unstable_mockModule('../src/db.js', () => ({
    insert: jest.fn(),
    getDB: jest.fn(),
    saveDB: jest.fn(),
}));

const { insert, getDB, saveDB } = await import('../src/db.js');
const { newNote, getAllNotes, removeNote } = await import('../src/notes.js');

beforeEach(() => {
    insert.mockClear()
    getDB.mockClear()
    saveDB.mockClear()
})

test('newNote inserts data and returns it', async () => {
    const note = 'Test note';
    const tags = ['tag1, tag2'];
    const data = {
        tags,
        content: note,
        id: Date.now(),
    };
    insert.mockResolvedValue(data);

    const result = await newNote(note, tags);
    expect(result.content).toEqual(data.content);
    expect(result.tags).toEqual(data.tags);
});

test('getAllNotes returns all notes', async () => {
    const db = {
        notes: ['note1', 'note2', 'note3']
    };
    getDB.mockResolvedValue(db);
})
