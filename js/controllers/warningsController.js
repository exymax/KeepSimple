app.controller("warningsController", function($scope, warningsService) {
    $scope.warnings = warningsService.messages;
});
