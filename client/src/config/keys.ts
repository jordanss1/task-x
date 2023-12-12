import devKeys, { KeysType } from "./dev";
import prodKeys from "./prod";

let keys: KeysType;

if (import.meta.env.PROD) {
  keys = prodKeys;
} else {
  keys = devKeys;
}

export default keys;
