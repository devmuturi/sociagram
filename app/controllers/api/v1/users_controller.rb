class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!, except: [ :index ]
  before_action :set_user, only: [ :show, :update, :destroy ]

  # GET /api/users
  def index
    @users = User.all
    render json: @users
  end

  # GET /api/users/:id
  def show
    render json: @user
  end

  # PUT /api/users/:id
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/users/:id
  def destroy
    @user.destroy
    head :no_content
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :bio, :avatar)
  end

  # POST /api/v1/users/:id/follow
  def follow
    @user = User.find(params[:id])
    current_user.following << @user
    head :no_content
  end

  # DELETE /api/v1/users/:id/unfollow
  def unfollow
    @user = User.find(params[:id])
    current_user.following.delete(@user)
    head :no_content
  end

  # GET /api/v1/users/suggestions
  def suggestions
    @users = User.where.not(id: current_user.id).limit(10) # Simple suggestion: users not followed
    render json: @users.as_json(only: [ :id, :name, :email ])
  end

  # GET /api/v1/users/:id/posts
  def user_posts
    @user = User.find(params[:id])
    @posts = @user.posts.includes(:user).order(created_at: :desc)
    render json: @posts.as_json(include: :user)
  end
end
