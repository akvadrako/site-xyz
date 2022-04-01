/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
  return ['nl', 'en'].includes(param);
}
