export interface SaveAccessTokes {
  save: (accessToken: string) => Promise<void>
}
