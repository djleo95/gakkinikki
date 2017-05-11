class RegistrationsController < Devise::RegistrationsController
  def show
  end

  private

  def sign_up_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :avatar)
  end

  def account_update_params
    params.require(:user).permit(:name, :email, :password,
      :password_confirmation, :current_password, :avatar, :avatar_cache)
  end

  def after_update_path_for(resource)
    user_path(resource)
  end
end
