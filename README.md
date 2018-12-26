# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false、unique:true|
|image|text|
|email|string|null: false, unique:true|
|password|string|null: false|
|profile|text|

### Association
- has_many :comments
- has_many :points
- has_one :personal_data
- has_many :rates
- has_many :likes
- has_many :sales_amounts
- has_many :bought_items, foreign_key: "buyer_id", class_name: "Item"
- has_many :selling_items, -> {where("buyer_id is NULL")}, foreign_key: "seller_id", class_name: "Item"
- has_many :sold_items, -> { where("buyer_id is not NULL") }, foreign_key: "seller_id", class_name: "Item"
- has_many :buyer, foreign_key: "buyer_id" ,class_name:"Dealing"
- has_many :seller, foreign_key: "seller_id" ,class_name:"Dealing"


## itemsテーブル

|Column|Type|options|
|------|----|-------|
|name|string|null: false,index: true|
|price|integer|null: false|
|description|text|null: false|
|condition|string|null: false|
|first_category_id|reference|null: false, foreign_key: true|
|second_category_id|reference|null: false, foreign_key: true|
|third_category_id|reference|null: false, foreign_key: true|
|brand_id|reference|foreign_key: true|
|size_id|reference|null: false, foreign_key: true|
|seller_id|integer|foreign_key: true|
|buyer_id|integer|foreign_key: true|

### Association
- belongs_to :user
- belongs_to :brand
- belongs_to :size
- belongs_to :first_category
- belongs_to :second_category
- belongs_to :third_category
- has_many :reports
- has_many :likes
- has_many :comments
- has_one :image
- has_one :delivery
- has_one :dealing
- belongs_to :saler, class_name: "User"
- belongs_to :buyer, class_name: "User"


## imagesテーブル

|column|Type|options|
|------|----|-------|
|image1|text|null: false|
|image2|text|
|image3|text|
|image4|text|
|item_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :image


## first_categoriesテーブル

|column|Type|options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :second_categories
- has_many :items


## second_categoriesテーブル

|column|Type|options|
|------|----|-------|
|name|string|null: false|
|first_category_id|null: false, foreign_key: true|

### Association
- belongs_to :first_category
- has_many :items
- has_many :third_categories


## third_Categoriesテーブル

|column|Type|options|
|------|----|-------|
|name|string|null: false|
|second_category_id|null: false, foreign_key: true|

### Association
- belongs_to :second_category
- has_many :items

## brandsテーブル

|column|Type|options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :items


## commentsテーブル

|column|Type|options|
|------|----|-------|
|comment|text|null: false|
|user_id|reference|null: false, foreign_key: true|
|item_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :item


## Reportsテーブル
|column|Type|options|
|------|----|-------|
|kind|integer|null: false|
|item_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :item


## pointsテーブル

|column|Type|options|
|------|----|-------|
|increase|integer|
|decrease|integer|
|user_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :user


## sales_amountsテーブル

|column|Type|options|
|------|----|-------|
|increase|integer|
|decrease|integer|
|user_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :user


## deliveriesテーブル

|column|Type|options|
|------|----|-------|
|fee|string|null: false|
|kind|string|null: false|
|area|string|null: false|
|delivery_days|string|null: false|
|item_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :item


## personal_datasテーブル

|column|Type|options|
|------|----|-------|
|family_name|string|null: false|
|first_name|string|null: false|
|family_kana|string|null: false|
|first_kana|string|null: false|
|postal_code|integer|null: false|
|prefectures|string|null: false|
|municipality|string|null: false|
|address_num|string|null: false|
|building_name|string|
|telephone|integer|
|birth_day|date|
|user_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :user


## banks テーブル

|column|Type|options|
|------|----|-------|
|name|string|null: false|
|type|integer|null: false|
|code|integer|null: false|
|number|integer|null: false|
|family_name|string|null: false|
|first_name|string|null: false|
|user_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :user


## likesテーブル

|column|Type|options|
|------|----|-------|
|user_id|reference|null: false, foreign_key: true|
|item_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :item


## ratesテーブル

|column|Type|options|
|------|----|-------|
|rate|integer|null: false|
|user_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :user


## sizesテーブル

|column|Type|options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :items


## dealingsテーブル

|column|Type|options|
|------|----|-------|
|buyer_id|reference|null: false, foreign_key: true|
|seller_id|reference|null: false, foreign_key: true|
|item_id|reference|null: false, foreign_key: true|

### Association
- has_many :messages
- belongs_to :user
- belongs_to :item


## messagesテーブル

|column|Type|options|
|------|----|-------|
|message|text|null: false|
|dealing_id|reference|null: false, foreign_key: true|
|user_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :dealing

