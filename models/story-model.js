import ApiService from "../services/api-service.js";

class StoryModel {
  constructor() {
    this._apiService = new ApiService();
  }

  async getStories(page = 1, size = 10, location = 1) {
    const stories = await this._apiService.getStories(page, size, location);
    return stories;
  }

  async getStoryDetail(id) {
    const story = await this._apiService.getStoryDetail(id);
    return story;
  }

  async addStory(description, photoBlob, lat, lon) {
    const result = await this._apiService.addStory(
      description,
      photoBlob,
      lat,
      lon
    );
    return result;
  }
}

export default StoryModel;
