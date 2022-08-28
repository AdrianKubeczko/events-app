import * as R from "ramda";

export const mapPromise = R.curry((a, b) => Promise.all(R.map(a, b)));