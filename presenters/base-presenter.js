class BasePresenter {
  constructor(view) {
    this._view = view;
  }

  init() {}

  handleError(error, defaultMessage = "An error occurred") {
    const message = error.message || defaultMessage;

    if (this._view && typeof this._view.showError === "function") {
      this._view.showError(message);
    }

    console.error("Presenter error:", error);
    return message;
  }
}

export default BasePresenter;
