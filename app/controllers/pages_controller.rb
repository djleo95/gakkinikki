class PagesController < ApplicationController
  def show
    case params[:case]
      when 1
        "asd"
      when 2
        "It's 6"
      when 3
        "You passed a string"
      when 4
        "You passed a string"
    end
    @image = Image.order(created_at: :desc)
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
