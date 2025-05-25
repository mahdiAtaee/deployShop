import FilterValueEnum from "./FilterValueEnum";

export default interface IAttribute {
  name: {
    fa: string,
    en: string
  }
  slug: string
  type: FilterValueEnum
  values: []
  filterable: boolean
  hasPrice: boolean
}
