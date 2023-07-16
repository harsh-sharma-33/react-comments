import ICommentData from './interfaces/ICommentData'
export const comments: ICommentData[] = [
    {
        id: Symbol(),
        value: 'This is comment 1',
        level: 1,
        replies: [
            {
                id: Symbol(),
                value: 'this is reply comment',
                level: 2
            },
            {
                id: Symbol(),
                value: 'this is reply comment 2',
                level: 2,
                replies: [{
                    id: Symbol(),
                    value: 'this is level 3',
                    level: 3
                }]
            }
        ]

    }
] 