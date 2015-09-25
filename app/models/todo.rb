class Todo < ActiveRecord::Base
  validates :title, :done, presence: true
  after_initialize :defaults

  def defaults
    #sets the default of done to false
    @done ||= false
  end
end
