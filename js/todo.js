function TodoController($scope){

	$scope.myTodoList = [
		{text:'Learn javascript', done: true},
		{text:'Learn jQuery', done: true},
		{text:'Learn Angualr', done: false}		
	];

	$scope.addTodo = function(){
		$scope.myTodoList.push({text:$scope.todoAddText, done: false});

		$scope.todoAddText = '';
	};

	$scope.getTotalTodos = function(){
		return $scope.myTodoList.length;
	};

	$scope.getTotalTodos = function(){
		return $scope.myTodoList.length;
	};

	$scope.remaining = function(){
		return _.filter($scope.myTodoList, function(todo){
			return !todo.done;
		}).length;			
	};

	$scope.clearCompleted = function(){

		$scope.myTodoList = _.filter($scope.myTodoList, function(todo){
			return !todo.done;
		});

	};
}