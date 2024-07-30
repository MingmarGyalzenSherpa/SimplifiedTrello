export const interpolate = (
  str: string,
  params: Record<string, string | number>
) => {
  let interpolatedString = str;

  Object.keys(params).forEach((key) => {
    interpolatedString = interpolatedString.replace(
      `:${key}`,
      `${params[key]}`
    );
  });

  return interpolatedString;
};
