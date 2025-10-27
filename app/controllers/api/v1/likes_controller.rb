class Api::V1::LikesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_post

  def create
    @like = @post.likes.build(user: current_user)

    if @like.save
      head :no_content
    else
      render json: @like.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @like = @post.likes.find_by(user: current_user)
    @like.destroy
    head :no_content
  end

  private

  def set_post
    @post = Post.find(params[:post_id])
  end
end
