const modes = ['normal', 'hard']
type Mode = typeof modes[number]
const nextActions = ['play again', 'exit'] as const
type NextAction = typeof nextActions[number]

class GameProcedure{
    private currentGameTitle = 'hit and blow'
    private currentGame = new HitAndBlow()

    public async start(){
        await this.play()
    }

    private async play(){
        printLine(`===\ncurrent game is ${this.currentGameTitle}.\n===`)
        await this.currentGame.setting()
        await this.currentGame.play()
        this.currentGame.end()
        
        const action = await promptSelect<NextAction>('do you want continue?', nextActions)

        if(action === 'play again'){
            await this.play()
        }else if(action === 'exit'){
            this.end()
        }else{
            const neverValue: never = action
            throw new Error(`${neverValue} is an invalid action.`)
        }
    }

    private end(){
        printLine('game be finished!!')
        process.exit()
    }

}

class HitAndBlow{
    private readonly answerSource = [...Array(10)].map((_, i) => String(i))
    private answer: string[] = []
    private tryCount: number = 0
    private mode: Mode = 'normal'

    async setting(){
        this.mode = await promptSelect('please enter preferred mode', modes)
        const answerLength = this.getAnswerLength()

        while(this.answer.length < answerLength){
            const randNum = Math.floor(Math.random() * this.answerSource.length)
            const selectedItem = this.answerSource[randNum]

            if(!this.answer.includes(selectedItem)){
                this.answer.push(selectedItem)
            }
        }
    }

    private getAnswerLength(){
        switch(this.mode){
            case 'normal':
                return 3
            case 'hard':
                return 5
            default:
                throw new Error(`${this.mode} is invalid.`)
        }
    }

    async play(){
        const answerLength = this.getAnswerLength()
        const inputArray = (await promptInput(`please enter ${answerLength} number with ,`)).split(',')

        if(!this.validate(inputArray)){
            printLine('input is invalid')
            await this.play()
            return
        }

        const result = this.check(inputArray)

        if(result.hit !== this.answer.length){
            printLine(`----\nHit: ${result.hit}\nBlow: ${result.blow}\n----`)
            this.tryCount += 1
            await this.play()
        }else{
            this.tryCount += 1
        }
    }

    private check(input: string[]){
        let hitCount = 0
        let blowCount = 0
        
        input.forEach((val, index) => {
            if(val === this.answer[index]){
                hitCount += 1
            }else if(this.answer.includes(val)){
                blowCount += 1
            }
        })

        return {
            hit: hitCount,
            blow: blowCount
        }
    }

    private validate(inputArray: string[]){
        const isLengthValid = inputArray.length === this.answer.length
        const isAllAnswerSourceOption = inputArray.every((val) => this.answerSource.includes(val))

        return isLengthValid && isAllAnswerSourceOption
    }

    end(){
        printLine(`hit!\ntry count is ${this.tryCount}.`)
        this.reset()
    }

    private reset(){
        this.answer = []
        this.tryCount = 0
    }
}

const printLine = (text: string, breakLine: boolean = true) => {
    process.stdout.write(text + (breakLine ? '\n' : ''))
}

const promptInput = async (text: string) => {
    printLine(`\n${text}\n`, false)
    const input: string = await new Promise((resolve) => process.stdin.once('data', (data) => resolve(data.toString())))

    return input.trim()
}

const promptSelect = async <T extends string>(text: string, values: readonly T[]): Promise<T> => {
    printLine(`\n${text}`)

    values.forEach((value) => {
        printLine(`- ${value}`)
    })

    printLine('>', false)

    const input = (await readLine()) as T

    if(values.includes(input)){
        return input
    }else{
        printLine(`${input} is invalid.`)
        return promptSelect<T>(text, values)
    }
}

const readLine = async () => {
    const input: string = await new Promise((resolve) => process.stdin.once('data', (data) => resolve(data.toString())))

    return input.trim()
}

(async () => {
    new GameProcedure().start()
})()