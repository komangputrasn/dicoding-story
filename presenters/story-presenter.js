import BasePresenter from "./base-presenter.js";
import StoryModel from "../models/story-model.js"; // Impor StoryModel

class StoryPresenter extends BasePresenter {
  constructor(view) {
    super(view);
    this._storyModel = new StoryModel(); // Gunakan StoryModel
  }

  async getStories(page = 1, size = 10, location = 1) {
    try {
      this._view.showLoading();
      const stories = await this._storyModel.getStories(page, size, location);
      return stories;
    } catch (error) {
      this._view.showError(`Failed to load stories: ${error.message}`);
      return [];
    } finally {
      this._view.hideLoading();
    }
  }

  async getStoryDetail(id) {
    try {
      this._view.showLoading();
      const story = await this._storyModel.getStoryDetail(id);
      return story;
    } catch (error) {
      this._view.showError(`Failed to load story: ${error.message}`);
      throw error;
    } finally {
      this._view.hideLoading();
    }
  }

  async addStory(description, photoBlob, lat, lon) {
    try {
      this._view.showLoading();
      const result = await this._storyModel.addStory(
        description,
        photoBlob,
        lat,
        lon
      );
      this._view.showSuccess(
        "Story added successfully. Redirecting to home page..."
      );
      return result;
    } catch (error) {
      this._view.showError(`Failed to add story: ${error.message}`);
      throw error;
    } finally {
      this._view.hideLoading();
    }
  }
}

export default StoryPresenter;
