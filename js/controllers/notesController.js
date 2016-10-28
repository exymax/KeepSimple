app.controller("notesController", function($scope, $mdDialog, $timeout, dataService, noteService) {

    $scope.pageParams = {
        width: $("body").width(),
        height: $("body").height()
    };

    $scope.notes = noteService.getNotes();
    $scope.numeration = $scope.notes.length-1;
    //$scope.numeration = 0;
    $scope.currentInProgress = "";
    $scope.wrapper = document.getElementById("layout-wrapper");
    $scope.wrapperJQ = $("#layout-wrapper"),
    $scope.creatorIsActive = false;
    $scope.edit = noteService.getNoteModel();
    $scope.inProgress = noteService.getNoteModel();
    $scope.uploadedImages = [];
    //console.log(pageParams);

    $scope.colors = ['#1abc9c', '#3498db', '#f1c40f', '#e74c3c', '#fff'];

    $scope.$on('$dropletReady', function() {
        $scope.interface.allowedExtensions(['png', 'jpg', 'bmp', 'gif']);
    });


    $scope.$on('$dropletFileAdded', function() {
        /*$scope.notes.push({

        });*/
        reloadMasonry();
    });

    /*$scope.wrapperJQ.masonry({
        itemSelector: '.note',
        percentPosition: true,
        gutter: 15,
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
                //alert($scope.pageParams);
                $scope.notes.unshift(noteService.getNoteModel($scope.inProgress.name, $scope.inProgress.content, $scope.pageParams));
            }
            $scope.inProgress.name = "";
            $scope.inProgress.content = "";
            $scope.numeration++;
            reloadMasonry();
    }

    $scope.deleteNote = function(note) {
        let index = $scope.notes.indexOf(note);
        if(index != -1) {
                $scope.notes.splice(index, 1);
                $scope.numeration--;
        }
        else alert("No note with id "+note.id);
    }

    $scope.toggleColorChanger = function(note) {
        note.colorChangerActive = true;
    }

    $scope.showInfo = function(note, ev) {
        if(!$scope.dragging) {
            $mdDialog.show({
                controller: DialogController,
                contentElement: "#dialog-container",
                targetEvent: ev,
                parent: angular.element(document.getElementById("notes-wrapper")),
                clickOutsideToClose: true
            });
            noteService.openEditor(note, $scope.edit);
        }
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

    function updatePageParams() {
        $scope.pageParams.width = $("body").width();
        $scope.pageParams.height = $("body").height();
    }

    function reloadMasonry() {
        //$("#layout-wrapper").masonry("reloadItems").masonry();
        updatePageParams();
    }

});
