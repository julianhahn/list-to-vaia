export const modes = {
    INPUT: 'INPUT',
    OUTPUT: 'OUTPUT'
} as const;

export type mode_type = (typeof modes)[keyof typeof modes];
