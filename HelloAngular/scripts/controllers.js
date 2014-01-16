var organizeMeApp = angular.module('OrganizeMe',['ngRoute']);



organizeMeApp.config(function($routeProvider,$locationProvider){
	$routeProvider.
		when("/shopping", {
			controller: ShoppingController,
			templateUrl: "shopping.html"
		}).
		when("/contact", {
			controller: ContactsController,
			templateUrl: "contacts.html"
		}).
		when("/task", {
			controller: TasksController,
			templateUrl: "tasks.html"
		}).
		otherwise({
			redirectTo:'/'
		});			
			
});

organizeMeApp.factory('Items', function(){
               var items = {};
               items.query = function(){
                   
                 //Normally we would pull this from the server
                 return [
                    { title:"Paint pots", quanity:8, price:3.95},
                    { title:"Polka dots", quanity:17, price:12.95},
                    { title:"Pebbles", quanity:5, price:6.95}
				  ];
              
                };
               return items;
            });

function ShoppingController($scope, Items){
    
    $scope.bill = {};                         
                
                $scope.items = Items.query();
                
				$scope.subtotal = function(){
						return $scope.totalCart() - $scope.bill.discount;
				};
				
				$scope.calculateTotals = function(){
					var total = 0;
					
					angular.forEach($scope.items, function(item){
  							total+= item.price * item.quanity;
						});
						
					$scope.bill.total = total;
					$scope.bill.discount = total > 100 ? 10 : 0;
					$scope.bill.subtotal = total - $scope.bill.discount;
						
				};
				
				$scope.$watch('items', $scope.calculateTotals, true);
    
}

function ContactsController($scope, $http){
	
		$scope.contacts = [{firstName:"Mike",lastName:"Patrick"},
		{firstName:"John",lastName:"James"},
		{firstName:"Bob",lastName:"Michael"},
		{firstName:"Dan",lastName:"Henry"}];
		
			$scope.loadContacts = function(){
				$http.get("http://localhost:50204/api/friends")
				.success(function(data){
					$scope.contacts = data;
				}).error(function(){
				   alert("An unexpected error occurred"); 
				});                    
			};
                
}

function TasksController($scope, $http){
                
		$scope.tasks = [];
        
        loadData();                                
        
        function loadData(){
            $http.get("http://localhost:50204/api/tasks")
            .success(function(data){                        
                $scope.tasks = data;
            });                                   
        }
        
        $scope.getTotalTodos = function(){                                                        
            return $scope.tasks.length;                     
        };                
        
        $scope.remaining = function(){
            return _.filter($scope.tasks, function(task){
                return !task.Done;
            }).length;
        };
        
        $scope.clearCompleted = function(){
            $scope.tasks = _.filter($scope.tasks, function(task){
                return !task.Done;
            }); 
        };
        
        $scope.taskName = null;
                
                
                $scope.createTask = function(){
                    
                    var data = { Name: $scope.taskName };                    
                                        
                    $http.post("http://localhost:50204/api/tasks", data)
                        .success(function(data, status, headers){                               
                            $http.get("http://localhost:50204/" + headers("location"))
                                .success(function(data){                                                                                                            
                                    $scope.tasks.push(data)
                                    $scope.taskName = null;
                                });
                            
                        });
                };
	                
}