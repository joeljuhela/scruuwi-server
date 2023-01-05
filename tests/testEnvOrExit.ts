export default () => {
  const env = Deno.env.get("DENO_ENV");
  if (!env || (env.toUpperCase() !== "TEST")) {
    console.error(
      `"DENO_ENV" is not "TEST" (it was ${env})! Only run tests with "deno task test"`,
    );
    Deno.exit(1);
  }
};
