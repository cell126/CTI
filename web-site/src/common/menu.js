import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '能力清单',
    icon: 'table',
    path: 'list',
    children: [
      {
        name: '查询能力',
        path: 'item-list',
      },
      {
        name: '查询武汉项目',
        path: 'item_wuhan-list',
      },
    ],
  }
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
