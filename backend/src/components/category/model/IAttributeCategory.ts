import IAttribute from './IAttribute'
export default interface IAttributeCategory {
    hash: string
    name: string
    slug: string
    filters:IAttribute[]
}