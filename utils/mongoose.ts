export const cleanModel = (doc) => {
    if (doc) {
        delete doc._id
        delete doc.__v
    }
}
