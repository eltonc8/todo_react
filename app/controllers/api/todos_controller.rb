module Api
  class TodosController < ApiController
    def index
      @todos = Todo.all
      render json: @todos
    end

    def show
      @todo = Todo.find(params[:id])
      render json: @todo
    end

    def create
      @todo = Todo.new(params[:id])
      if @todo.save
        render json: @todo, status: 201
      else
        render json: @todo.errors.full_messages, status: 422
      end
    end

    def update
      @todo = Todo.find(params[:id])
      if @todo.update(todo_params)
        render json: @todo
      else
        render json: @todo.errors.full_messages, status: 422
      end
    end

    def destroy
      @todo = Todo.find(params[:id])
      if @todo.destroy
        render json: @todo
      else
        render json: @todo.errors.full_messages, status: 422
      end
    end

    private
    def todo_params
      params.permit(:title, :body, :done)
    end
  end
end
