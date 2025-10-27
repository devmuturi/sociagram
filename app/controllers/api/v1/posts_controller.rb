class Api::V1::PostsController < ApplicationController
  before_action :authenticate_user!, except: [ :index, :show ]
  before_action :set_post, only: [ :show, :update, :destroy ]

  # GET /api/v1/posts
  def index
    @posts = Post.includes(:user).all.order(created_at: :desc)
    render json: @posts.as_json(include: :user)
  end

  # GET /api/v1/post/:id
  def show
    render json: @post.as_json(include: :user)
  end

  # POST /api/v1/posts
  def create
    @post = current_user.posts.build(post_params)

    if @post.save
      render json: @post.as_json(include: :user), status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH /api/v1/posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/posts/1
  def destroy
    @post.destroy
    head :no_content
  end

  private

  def set_post
    if current_user
      @post = current_user.posts.find(params[:id])
    else
      @post = Post.find(params[:id])
    end
  end

  def post_params
    params.require(:post).permit(:content, photos: [])
  end

  # GET /api/v1/posts/newsfeed
  def newsfeed
    followed_users_ids = current_user.following.pluck(:id)
    @posts = Post.where(user_id: followed_users_ids).order(created_at: :desc)
    render json: @posts
  end

  # POST /api/v1/posts/:id/like
  def like
    @post = Post.find(params[:id])
    @post.likes.create(user: current_user)
    head :no_content
  end

  # DELETE /api/v1/posts/:id/unlike
  def unlike
    @post = Post.find(params[:id])
    @post.likes.where(user: current_user).destroy_all
    head :no_content
  end
end
