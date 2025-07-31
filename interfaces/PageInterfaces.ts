export interface IPageList {
  id: string
  name: string
  contentWithoutList?: string[]
  content?: string[] | {
    list?: string[]
  }
}
