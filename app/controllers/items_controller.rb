class ItemsController < ApplicationController
  before_action :set_item, only: [:show, :edit, :update, :buy, :pay]
  before_action :set_sell_items, :set_delivery, :set_category_items, only: :show
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_category_and_size, only: [:new, :edit]

  def index
    @items = Item.order('created_at DESC').limit(4)
  end

  def new
    @item = Item.new
    @item.build_image
    @item.build_delivery
  end

  def select_first_category
    @item = Item.new
    @second_categories = SecondCategory.where(first_category_params)
  end

  def select_second_category
    @item = Item.new
    @third_categories = ThirdCategory.where(second_category_params)
  end

  def select_third_category
    @item = Item.new
    @sizes = Size.all
  end

  def create
    @item = Item.new(item_params)
    if @item.save
      redirect_to root_path
    else
      render :new
    end
  end

  def show
    @item = Item.find(params[:id])
  end

  def edit
  end

  def update
    if @item.seller_id == current_user.id
      @item.update(item_params)
      redirect_to item_path(@item)
    end
  end

  def buy
  end

  def pay
    Payjp.api_key = ENV['PAYJP_API_SECRET']
      charge = Payjp::Charge.create(
        amount: @item.price,
        card: params[:'payjp-token'],
        currency: 'jpy',
        )

    @item.buyer_id = current_user.id
    @item.save
    redirect_to item_url(@item)
  end

  def search
    @items = Item.where('name LIKE(?) or description LIKE(?)', "%#{params[:keyword]}%", "%#{params[:keyword]}%").order('created_at DESC')
  end

  def destroy
    @item = Item.find(params[:id])
    if @item.destroy
      flash[:notice] = "商品を削除しました"
      redirect_to mypage_users_path
    end
  end

  private

  def item_params
    params.require(:item).permit(:name, :description, :first_category_id, :second_category_id, :third_category_id, :size_id, :brand_id, :condition, :price, image_attributes: [:id, :image1, :image2, :image3, :image4], delivery_attributes: [:id, :fee, :kind, :area, :delivery_days]).merge(seller_id: current_user.id)
  end

  def set_category_and_size
    @first_categories = FirstCategory.all
    @second_categories = SecondCategory.all
    @third_categories = ThirdCategory.all
    @sizes = Size.all
  end

  def first_category_params
    params.require(:item).permit(:first_category_id)
  end

  def second_category_params
    params.require(:item).permit(:second_category_id)
  end

  def third_category_params
    params.require(:item).permit(:third_category_id)
  end

  def set_item
    @item = Item.find(params[:id])
  end

  def set_sell_items
    @user_sell_items = Item.where(seller_id: @item.seller_id).where.not(id: @item.id).limit(6)
    @previous_item = @user_sell_items.where('id < ?', @item.id).first
    @next_item = @user_sell_items.where('id > ?', @item.id).first
  end

  def set_delivery
    @delivery = Delivery.find_by(item_id: params[:id])
  end

  def set_category_items
    @same_category_items = Item.where(third_category_id: @item.third_category_id).where.not(id: @item.id).limit(6)
  end

end
