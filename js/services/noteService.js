app.service("noteService", function(dataService) {
    let curNote = null;

    this.openEditor = function(note, edit) {
        curNote = note;
        edit.name  = note.name;
        edit.content = note.content;
    }

    this.closeEditor = function(edit) {
        edit.name = "";
        edit.content = "";
        curNote = null;
    }

    this.saveNote = function(edit) {
        if(curNote !== null) {
            curNote.name = edit.name;
            curNote.content = edit.content;
        }
        else alert("ex: note is not defined");
        this.closeEditor(edit);
    }

    this.getNotes = function(){
        return dataService.getData();
    }


    this.getNoteModel = function(name, content, pageParams, image, imageUrl) {
        let note = {
                isImaged: !!image,
                imageUrl: imageUrl,
                background: '#fff',
                name: name,
                content: content
            };
        if(pageParams) {
            let position = getPosition(pageParams);
            note.x = position.x;
            note.y = position.y;
        }
        return note;
    }

    this.getImageNoteModel = function() {
        return {
            isImage: true,
            url: ""
        };
    }

    this.saveToStorage = function(note) {

    }

    function getPosition(pageParams) {
        //alert(pageParams);
        let x = getRnd(0, pageParams.width-200),
            y = getRnd(0, pageParams.height);
        return {
            x: x,
            y: y
        }
    }

    function getRnd(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    }

});
