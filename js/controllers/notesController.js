app.controller("notesController", function($scope, $mdDialog, $timeout, dataService, noteService) {

    $scope.notes = dataService.getData();
    $scope.numeration = $scope.notes.length;
    $scope.numeration++;
    $scope.currentInProgress = "";
    $scope.wrapper = document.getElementById("layout-wrapper");
    $scope.wrapperJQ = $("#layout-wrapper"),
    $scope.notesMasonry = null;
    $scope.creatorIsActive = false;
    $scope.edit = noteService.getNoteModel();
    $scope.inProgress = noteService.getNoteModel();
    $scope.uploadedImages = [];
    //$scope.interface = null;

    $scope.$on('$dropletReady', function() {
        $scope.interface.allowedExtensions(['png', 'jpg', 'bmp', 'gif']);
    });

    $scope.$on('$dropletFileAdded', function() {
        /*$scope.notes.push({

        });*/
        reloadMasonry();
    })

    $scope.wrapperJQ.masonry({
        itemSelector: '.masonry-brick',
        percentPosition: true,
        gutter: 15,
    }).sortable({

        start: function(event, ui) {
            console.log(ui);
            ui.item.removeClass('masonry-brick');
            ui.item.parent().masonry('reloadItems').masonry();
        },

        change:function(event, ui) {
            ui.item.parent().masonry('reloadItems').masonry();
        },

        stop: function(event, ui) {
            ui.item.addClass('masonry-brick');
            ui.item.parent().masonry('reloadItems').masonry();
        }
    });
    /*$scope.$watch('uploadedImages', function(newValue, oldValue, scope) {
        scope.uploadedImages = oldValue.concat(newValue);
        if(scope.uploadedImages.length>4)
            scope.uploadedImages = scope.uploadedImages.slice(-4, scope.uploadedImages.length);
    });*/
    $scope.logFiles = function(files) {
        $scope.uploadedImages = files;
    }
    $scope.selectImages = function() {
        angular.element(document.querySelector("#note-images-upload")).click();
    }
    $scope.keypressHandler = function(event) {
        if(event.which === 13)
            if($scope.creatorIsActive) $scope.toggleCreator();
    }
    $scope.toggleCreator = function() {
        $scope.creatorIsActive = !$scope.creatorIsActive;
        $scope.uploadedImages = [];
        angular.element(document.querySelector("#backdrops")).toggleClass("disabled");
    }
    $scope.addNewNote = function() {
            if($scope.inProgress.name === "" || $scope.inProgress.content === "") {
                alert("Заполните поля названия и контента");
            }
            else {
                $scope.notes.unshift({
                    imageUrl: 0,
                    name: $scope.inProgress.name,
                    content: $scope.inProgress.content
                });
            }

            $scope.inProgress.name = "";
            $scope.inProgress.content = "";
            $scope.numeration++;
            reloadMasonry();
    }
    $scope.showInfo = function(note, ev) {
        $mdDialog.show({
            controller: DialogController,
            contentElement: "#dialog-container",
            targetEvent: ev,
            parent: angular.element(document.getElementById("notes-wrapper")),
            clickOutsideToClose: true
        });
        noteService.openEditor(note, $scope.edit);
    }
    $scope.hideInfo = function() {
        $mdDialog.hide();
        noteService.closeEditor($scope.edit)
    }
    $scope.saveInfo = function() {
        $mdDialog.hide();
        noteService.saveNote($scope.edit);
    }

    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }

    function reloadMasonry() {
        return $timeout(function() {
            $("#layout-wrapper").masonry('reloadItems').masonry();
        });
    }

});
