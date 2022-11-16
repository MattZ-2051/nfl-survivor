export type ApiOptions = RequestInit & {
    params?: string | string[][] | Record<string, string> | URLSearchParams
    authorization?: boolean
}
