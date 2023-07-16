/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import ICommentData from '../../interfaces/ICommentData'
import { IFormGeneratorInput } from '../../interfaces/IFormGeneratorInput';
import { FieldType } from '../../enums/FieldType';
import FormGenerator from '../form-generator/FormGenerator';
import { ButtonColor, ButtonType, IButtonGeneratorInput } from '../../interfaces/IButtonGeneratorInput';
import Button from '../button-generator/Button';
import styles from './comments.module.css'

type Props = {
    data: ICommentData[] | undefined;
    isRootComment?: boolean; // This is used for rendering first input box in case of first render and prevent it on recursive calls
    setCommentsData?: any
}

const Comments = (props: Props) => {

    const [rootFormData, setRootFormData] = useState<{ comment: string }>({ comment: '' })
    const [reply, setReply] = useState<{ reply: string }>({ reply: '' })
    const [toogleReply, setToggleReply] = useState<symbol[]>([])


    /**
     * Function is responsible for deleting comments in the array
     * @param value Array of type ICommentData 
     * @param commentId id of the comment user wish to delete
     * @returns ICommentData[] with removed comment 
     */
    const deleteComment = (value: ICommentData[], commentId: symbol): ICommentData[] => {
        return value.filter((comment) => {
            if (comment.id !== commentId) {
                if (comment.replies?.length) {
                    comment.replies = [...deleteComment(comment.replies, commentId)]
                }
                return comment.id
            } else {
                return false
            }
        })
    }

    /**
     * Function adds replies to the comment
     * @param value ICommentData[] --> Original array to be provided
     * @param commentId id of the comment to reply to 
     * @param commentValue string data of comment 
     * @returns ICommentData[] with added reply
     */

    const addReply = (value: ICommentData[], commentId: symbol, commentValue: string): ICommentData[] => {
        const finalValue = []
        for (let i = 0; i < value.length; i++) {
            const comment = value[i]
            if (comment.id === commentId) {
                if (comment.replies?.length) {
                    comment.replies = [{ value: commentValue, id: Symbol(), level: comment.level + 1 }, ...comment.replies]
                }
                if (!comment['replies']?.length) {
                    comment['replies'] = [{ value: commentValue, id: Symbol(), level: comment.level + 1 }]
                }
                finalValue.push(comment)
            } else {
                if (comment.replies) {
                    comment.replies = addReply(comment.replies, commentId, commentValue)
                    finalValue.push(comment)
                } else {
                    finalValue.push(comment)
                }
            }

        }
        return finalValue
    }

    const formGeneratorInput: IFormGeneratorInput = {
        fields: [
            {
                name: 'comment',
                type: FieldType.TEXT,
                placeHolder: 'Enter Comment',
                style: {
                    height: 40,
                    width: 300,
                    outline: 'none',
                    border: '1px solid blue',
                    padding: 5

                }
            }
        ]
    }

    const replyGeneratorInput: IFormGeneratorInput = {
        fields: [
            {
                name: 'reply',
                type: FieldType.TEXT,
                placeHolder: 'Reply',
                style: {
                    height: 30,
                    width: 300,
                    outline: 'none',
                    border: '1px solid blue',
                    padding: 5

                }
            }
        ]
    }

    const addCommentButton: IButtonGeneratorInput = {
        buttonColor: ButtonColor.PRIMARY,
        buttonType: ButtonType.FLAT,
        style: {
            marginLeft: 10
        },
        function: () => {
            console.log(rootFormData)
            props.setCommentsData((prev: ICommentData[]) => {
                return [
                    {
                        value: rootFormData.comment,
                        level: 1,
                        id: Symbol(),
                    } as ICommentData,
                    ...prev
                ]


            })
        }
    }

    const deleteButton: IButtonGeneratorInput = {
        buttonColor: ButtonColor.WARN,
        buttonType: ButtonType.STROKED,
        style: {
            marginLeft: 10
        },
        function: (_buttonRef: IButtonGeneratorInput, params?: any[]) => {
            const commentId = params![0] as symbol
            props.setCommentsData((prev: ICommentData[]) => {
                return deleteComment(prev, commentId)
            })
        }
    }

    const replyButton: IButtonGeneratorInput = {
        buttonColor: ButtonColor.PRIMARY,
        buttonType: ButtonType.STROKED,
        style: {
            marginLeft: 10
        },
        function: (_buttonRef: IButtonGeneratorInput, params?: any[]) => {
            const commentId = params![0] as symbol
            const action = params![1] as string
            if (action === 'toggle') {

                if (toogleReply.includes(commentId)) {
                    setToggleReply((pre: symbol[]) => {
                        return pre.filter(id => id !== commentId)
                    })
                } else {
                    setToggleReply((pre: symbol[]) => {
                        return [...pre, commentId]
                    })
                }
            }
            if (action === 'save') {
                console.log('save', reply)
                props.setCommentsData((prev: ICommentData[]) => {
                    return addReply(prev, commentId, reply.reply)
                })
                setToggleReply((pre => pre.filter(id => id !== commentId)))

            }
        }
    }


    return (
        <div >
            {props.isRootComment && (
                <div className={styles.rootWrapper}>
                    <FormGenerator setFormData={setRootFormData} data={formGeneratorInput} />
                    <Button buttonGeneratorInput={addCommentButton} >Add Comment</Button>
                </div>

            )}
            {props.data?.map((comment, index) => (
                <>
                    <div key={index} className={styles.commentContiner} style={{ marginLeft: `${20 * comment.level}px` }} >
                        <span >{comment.value}</span>
                        <Button buttonGeneratorInput={deleteButton} params={[comment.id]} >DELETE</Button>
                        <Button buttonGeneratorInput={replyButton} params={[comment.id, 'toggle']} >REPLY</Button>
                        {toogleReply.includes(comment.id) && <div className={styles.replyInputContainer} >
                            <FormGenerator setFormData={setReply} data={replyGeneratorInput} />
                            <Button buttonGeneratorInput={replyButton} params={[comment.id, 'save']} >Reply</Button>
                        </div>}
                    </div>
                    {/* Recursively calling component to render replies on comment */}
                    {comment.replies?.length ? <Comments data={comment.replies} setCommentsData={props.setCommentsData} isRootComment={false} /> : ''}
                </>
            ))}
        </div>
    )

}

export default Comments