export type PageError = {
    data: null | unknown
    status: number
    statusText?: string
    message?: string
}

export type ApiOptions = RequestInit & {
    params?: string | string[][] | Record<string, string> | URLSearchParams
    authorization?: boolean
}
