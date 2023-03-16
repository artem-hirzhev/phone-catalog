import { DropdownItem } from '../types';

// here we get the name for dropdown button which relative to serchParams
export const getButtonName = (searchParam: string, items: DropdownItem[]) => {
  return items.find(item => item.value === searchParam)?.name;
};
