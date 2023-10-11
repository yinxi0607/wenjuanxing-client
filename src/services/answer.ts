import {post} from "@/services/ajax";

// 提交答卷
export async function postAnswer(answerInfo: any){
    const url = "/api/answer"
    const data = post(url,answerInfo)
    return data
}