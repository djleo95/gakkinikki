class PagesController < ApplicationController
  def show
    if params[:user_id].nil?
      @user = current_user
    else
      @user = User.find_by id: params[:user_id]
    end
    case params[:case]
      when "2"
        @image = Image.order likes_count: :desc

      when "3"
        @image = current_user.feed.order created_at: :desc

      when "4"
        @image = current_user.feed.order likes_count: :desc
      when "5"
        if params[:search].present?
          @users = User.where("name like ?", "%#{params[:search]}%")
          @image = Image.joins(:user).where(user: @users.ids)
        else
          @image = Image.order created_at: :desc
        end
      when "6"
        if params[:search].present?
          @image = Image.where("title like ? or description like ?","%#{params[:search]}%","%#{params[:search]}%")
        else
          @image = Image.order created_at: :desc
        end
      else
        @image = Image.order created_at: :desc
    end
    if valid_page?
      render template: "pages/#{params[:page]}"
    else
      render file: "public/404.html", status: :not_found
    end
  end

  private
  def valid_page?
    File.exist? Pathname.new(Rails.root + "app/views/pages/#{params[:page]}.html.erb")
  end
end
