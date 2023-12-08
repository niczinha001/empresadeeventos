import { randomUUID } from "crypto"

export class DatabaseMemory{
#local = new Map()

list(search){
    return Array.from(this.#local.entries()).map((llocalArray) =>{
    // acessando primeira posição
        const id = llocalArray[0]
        const data = llocalArray[1]

        return{
            id,
            ...data
        }
    })
    .filter(local => {
        if (search){
            return local.titulo.includes(search)
        }
        return true
    })
}
create(local){
    const localId = randomUUID()
    this.#local.set(localId, local)
}
update(id, local){
    this.#local.set(id, local)
}
delete(id, local){
    this.#local.delete(id, local)
}
}