class PagesController < ApplicationController
  def show
    case params[:case]
      when "2"
        @image = Image.order likes_count: :desc

      when "3"
        @image = current_user.feed.order created_at: :desc

      when "4"
        @image = current_user.feed.order likes_count: :desc

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
