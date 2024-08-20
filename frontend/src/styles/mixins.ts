type OptionalProp<T> = T | false;
type GlobalCSSValue = 'inherit' | 'initial' | 'unset';
type RevertCSSValue = 'revert' | 'revert-layer';
type BaseCSSValue = GlobalCSSValue | RevertCSSValue;
type CSSValue<
  T extends string | number | never = '',
  Include extends BaseCSSValue = BaseCSSValue,
> = T extends never ? Include : Include | T;

type FontWeight = CSSValue<
  | 'normal'
  | 'bold'
  | 'lighter'
  | 'bolder'
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900,
  GlobalCSSValue
>;

export const font = (
  fontSize: OptionalProp<number>,
  color?: OptionalProp<string>,
  letterSpacing?: OptionalProp<number>,
  lineHeight?: OptionalProp<number>,
  fontWeight?: OptionalProp<FontWeight>,
): string => {
  let result = '';

  if (fontSize) {
    result += `font-size: ${fontSize}rem;`;
  }

  if (color) {
    result += `color: ${color};`;
  }

  if (letterSpacing) {
    result += `letter-spacing: ${letterSpacing}%;`;
  }

  if (lineHeight) {
    result += `line-height: ${lineHeight}rem;`;
  }

  if (fontWeight) {
    result += `font-weight: ${fontWeight};`;
  }

  return result;
};

type FlexDirection = CSSValue<
  'row' | 'row-reverse' | 'column' | 'column-reverse'
>;
type FlexWrap = CSSValue<'nowrap' | 'wrap' | 'wrap-reverse'>;
type AlignItems = CSSValue<
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'start'
  | 'end'
  | 'center'
  | 'baseline'
  | 'first baseline'
  | 'last baseline'
>;
type JustifyCenter = CSSValue<
  | 'justify-content'
  | 'center'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'left'
  | 'right'
  | 'normal'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch'
  | 'safe center'
  | 'unsafe center'
>;

export const flex = (
  flexDirection: OptionalProp<FlexDirection>,
  flexWrap?: OptionalProp<FlexWrap>,
  alignItems?: OptionalProp<AlignItems>,
  justifyContent?: OptionalProp<JustifyCenter>,
  gap?: OptionalProp<string>,
): string => {
  let result = 'display: flex;';

  if (flexDirection) {
    result += `flex-direction: ${flexDirection};`;
  }

  if (flexWrap) {
    result += `flex-wrap: ${flexWrap};`;
  }

  if (alignItems) {
    result += `align-items: ${alignItems};`;
  }

  if (justifyContent) {
    result += `justify-content: ${justifyContent};`;
  }

  if (gap) {
    result += `gap: ${gap}`;
  }

  return result;
};
