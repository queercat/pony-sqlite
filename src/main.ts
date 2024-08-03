import { Cards } from "./types"
import sqlite3 from "sqlite3"

const archiveApi = "https://archive.horse.cards/api/v0/cards"
const path = "archive.db"

const response = await fetch(archiveApi)

const cards = await response.json() as Cards

for (const card of cards) {
    for (const face of card.faces) {
        console.log("Fetching", face.image)
        const response = await fetch(face.image)
        const blob = await response.blob()
        const buffer = await blob.arrayBuffer()
        const base64 = Buffer.from(buffer).toString("base64")
        face.image = `data:image/png;base64,${base64}`
    }
    await new Promise(resolve => setTimeout(resolve, 25))
}

const db = new sqlite3.Database(path)

db.serialize(() => {
    db.run("CREATE TABLE Cards (id INTEGER PRIMARY KEY, data TEXT)")
    db.run("CREATE TABLE Faces (id INTEGER PRIMARY KEY, cardId INTEGER, name TEXT, setName TEXT, data TEXT)")

    const createCard = db.prepare("INSERT INTO Cards (id, data) VALUES (?, ?)")
    const createFace = db.prepare("INSERT INTO Faces (cardId, name, setName, data) VALUES (?, ?, ?, ?)")

    for (const card of cards) {
        const { faces, ...data } = card

        createCard.run(data.id, JSON.stringify(data))

        for (const face of faces) {
            createFace.run(data.id, face.name, data.set.name, JSON.stringify(face))
        }
    }

    createCard.finalize()
    createFace.finalize()
})

db.close()