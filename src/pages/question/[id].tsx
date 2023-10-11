import styles from "@/styles/Question.module.scss"
import PageWrapper from "@/components/PageWrapper";
import {getQuestionById} from "@/services/question";
import {getComponent} from "@/components/QuestionComponents"

type PropsType = {
    errno: number
    data?:{
        id:string
        title:string
        desc?:string
        js?:string
        css?:string
        isPublished: boolean
        isDeleted: boolean
        componentList: Array<any>
    }
    msg?:string
}

export default function Question(props: PropsType) {
    const {errno,data,msg} = props
    const { id,title="",isDeleted,desc,isPublished,componentList=[] } = data || {}
    if(errno!==0){
        return <PageWrapper title="错误">
            <h1>错误</h1>
            <p>{msg}</p>
        </PageWrapper>
    }
    if(isDeleted){
        return <PageWrapper title={title} desc={desc}>
            <h1>{title}</h1>
            <p>该问卷已经被删除</p>
        </PageWrapper>
    }

    if(!isPublished){
        return <PageWrapper title={title} desc={desc}>
            <h1>{title}</h1>
            <p>该问卷尚未发布</p>
        </PageWrapper>
    }

    const ComponentListElem = <>
        {componentList.map(c=>{
            const ComponentElem = getComponent(c)
            return <div key={c.fe_id} className={styles.componentWrapper}>
                {ComponentElem}
            </div>
        })}
    </>

    return <PageWrapper title={title} desc={desc}>
        <h1>Question Page</h1>
        <form method="post" action="/api/answer">
            <input type="hidden" name="questionId" value={id}/>
            {ComponentListElem}

            <div className={styles.submitBtnContainer}>
                <button type="submit">提交</button>
            </div>
        </form>
    </PageWrapper>
}

export async function getServerSideProps(context: any) {
    const {id} = context.params
    const data = await getQuestionById(id)
    return {
        props: data
    }
}