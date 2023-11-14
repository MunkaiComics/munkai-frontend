export class RouteNotFoundError extends Error {
  constructor(...args) {
    super(...args);
    // extending Error is fickle in a transpiler world - use name check instead of instanceof/constructor
    this.name = "RouteNotFoundError";
  }
}
