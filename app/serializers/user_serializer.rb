class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :name, :bio, :created_at
end
