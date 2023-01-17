export const modes = ['normal', 'hard']
export type Mode = typeof modes[number]
export const nextActions = ['play again', 'exit'] as const
export type NextAction = typeof nextActions[number]