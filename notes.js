const fs = require("fs")

const fetchNotes = () => {
    try {
        var notesString = fs.readFileSync("notes-data.json")
        return JSON.parse(notesString)
    } catch (e) {
        return []
    }
}
const saveNotes = (notes) => {
    fs.writeFileSync("notes-data.json", JSON.stringify(notes))
}
const addNote = (title, body) => {
    console.log("add note", title, body)
    var notes = fetchNotes()
    var note = {
        title,
        body
    }
    var duplicateNotes = notes.filter((note) => note.title === title)

    if (duplicateNotes.length === 0) {
        notes.push(note)
        saveNotes(notes)
        return note
    }
}
const listAll = () => {
    return fetchNotes()
}
const read = (title) => {
    var notes = fetchNotes()
    var filteredNotes = notes.filter((note) => note.title === title)
    return filteredNotes[0]
}
const remove = (title) => {
    var notes = fetchNotes()
    var filteredNotes = notes.filter((note) => note.title !== title) 
    saveNotes(filteredNotes)
    return notes.length !== filteredNotes.length
}
const logNotes = (note) => {
    console.log("---")
    console.log(`Note-title: ${note.title}, Note-body: ${note.body}`)
}
module.exports = {
    addNote,
    listAll,
    read,
    remove,
    logNotes
}
