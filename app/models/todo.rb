class Todo < ActiveRecord::Base
  validates :title, presence: true
  validates :done, inclusion: { in: [true, false] }
  after_initialize :defaults

  def defaults
    #sets the default of done to false
    @done ||= false
  end
end
