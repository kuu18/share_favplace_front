type ValidationFunction = (v: string) => boolean | string

export type Validation = ValidationFunction | string | boolean