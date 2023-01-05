const envValue = Deno.env.get("DENO_ENV")
export default {
  env: envValue && envValue.toLowerCase() || 'dev',
};
