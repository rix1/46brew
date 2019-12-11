// @flow
function createInlineSVG(icon: string) {
  return `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 18 18"><text text-anchor="middle" dy=".35em" y="50%" x="50%" font-size="14px">${icon}</text></svg>`;
}

export default createInlineSVG;
