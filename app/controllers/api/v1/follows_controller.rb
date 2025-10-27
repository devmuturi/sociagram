class Api::V1::FollowsController < ApplicationController
  before_action :authenticate_user!

  def create
    user = User.find(params[:followed_id])
    current_user.following << user
    head :no_content
  end

  def destroy
    user = User.find(params[:id]) # params[:id] will be the followed_id
    current_user.following.delete(user)
    head :no_content
  end
end
