export interface IPageList {
  id: string
  name: string
  contentWithoutList?: string[]
  content?: string[] | {
    list?: string[]
  }
}

export interface IHeaderTab {
  label: string
  route?: string
  description?: string
  auth: boolean
}

export interface IHeaderTabs extends IHeaderTab {
  items?: IHeaderTab[]
}
