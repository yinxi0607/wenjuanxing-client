import {get} from "@/services/ajax";

export async function getQuestionById(id: string){
    const url = `/api/question/${id}`
    const data = get(url)
    return data
}