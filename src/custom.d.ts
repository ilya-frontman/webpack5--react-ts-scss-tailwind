declare module '*.svg' {
  const content: any;
  export default content;
}

interface SVGSprite {
  id: string;
  url: string;
  viewBox: string;
  toString(): string;
}

type SVGIcon = {
  svg: SVGSprite;
  classnames: string | Array<string>;
};
