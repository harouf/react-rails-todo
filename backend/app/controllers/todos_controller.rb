class TodosController < ApplicationController
  protect_from_forgery with: :null_session
  respond_to :json
  before_action :set_todo, only: [:show, :update, :destroy]

  def index
    render json: ToDo.all
  end

  def show
    render json: @to_do
  end

  def create
    @to_do = ToDo.new(todo_params)
    @to_do.save
    render json: @to_do
  end

  def update
    @to_do.update(todo_params)
    @to_do.save
    render json: @to_do
  end

  def destroy
    @to_do.destroy
    render json: { success: true }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo
      @to_do = ToDo.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def todo_params
      params.require(:todo).permit(:text, :checked)
    end
end
