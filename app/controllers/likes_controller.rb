class LikesController < ApplicationController
  def create
    @like = Like.new
    @like.image_id = params[:image_id]
    @like.user = current_user
    @like.save
  end

  def destroy
    @like = Like.find_by id: params[:id]
    @like.destroy
  end
end
