import mongoose from 'mongoose'
import { getDbConnectionString } from '../config/index.js'

export default async function makeDb () {
    const db = await mongoose.connect(
        getDbConnectionString(),
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    return db
}
