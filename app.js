const yargv = require('yargs')

const notes = require("./notes")

const titleOptions = {
    describe: "Title of Note",
    demand: true,
    alias: "t"
}
const bodyOptions = {
    describe: "Body of Note",
    demand: true,
    alias: "b"
}
const argv = yargv
    .command("add", "Add a new note", {
        title: titleOptions,
        body: bodyOptions
    })
    .command("list", "List all notes")
    .command("read", "read a note from a list", {
        title: titleOptions
    })
    .command("remove", "remove a note from a list", {
        title: titleOptions
    })
    .help()
    .argv
const command = argv._[0]

if (command === "add") {
    note = notes.addNote(argv.title, argv.body)
    if (note) {
        console.log("Notes was created")
        notes.logNotes(note)
    } else {
        console.log("Note title taken")
    }
} else if (command === "list") {
    var allNotes = notes.listAll()
    console.log(`Printing ${notes.length} note(s)`)
    allNotes.forEach((note) => notes.logNotes(note))
} else if (command === "read") {
    var note = notes.read(argv.title)
    if (note) {
        console.log("note found")
        notes.logNotes(note)
    } else {
        console.log("note not found")
    }
} else if (command === "remove") {
    var noteRemoved = notes.remove(argv.title)
    var message = noteRemoved ? "note was removed" : "note is not existing"
    console.log(message)
} else {
    console.log("not a complete command")
}
