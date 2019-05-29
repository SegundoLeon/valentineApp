export abstract class BaseModel {

  constructor() {
      // any
  }

  public setAll(_params: any) {
      for (const param in _params) {
          if (_params.hasOwnProperty(param)) {
              this[param] = _params[param];
          }
      }
  }
}
