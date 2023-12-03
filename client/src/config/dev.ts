const keys = {
  server: import.meta.env.VITE_DEV_API_DOMAIN,
};

export type KeysType = typeof keys;

export default keys;
