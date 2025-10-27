require 'rails_helper'

RSpec.describe "Api::V1::Post::Comments", type: :request do
  describe "GET /create" do
    it "returns http success" do
      get "/api/v1/post/comments/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/api/v1/post/comments/update"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/api/v1/post/comments/destroy"
      expect(response).to have_http_status(:success)
    end
  end
end
