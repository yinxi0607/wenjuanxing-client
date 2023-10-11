// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {postAnswer} from "@/services/answer";

function genAnswerInfo(responseBody: any){
    const answerList:any[] = []
    Object.keys(responseBody).forEach(c=>{
        if (c==="questionId") return
        answerList.push({
            componentId: c,
            value: responseBody[c]
        })
    })
    return {
        questionId: responseBody.questionId,
        answerList,
    }
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.status(200).json({errno: -1, msg: "Method error"})
    }
    const answerInfo = genAnswerInfo(req.body)
    // console.log(answerInfo)
    try {
        const resData = await postAnswer(answerInfo)
        console.log('resData....-----',resData)
        if(resData.errno === 0){
            res.redirect('/success')
        }else{
            res.redirect('/fail')
        }

    } catch (err) {
        res.redirect('/fail')
    }
    // res.status(200).json({ errno:0 })
}
